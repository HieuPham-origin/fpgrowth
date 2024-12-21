from collections import defaultdict
import pandas as pd
from itertools import chain, combinations
from fptree import FPTree
class FPGrowth:
    def __init__(self, min_support=0.01, min_confidence=0.1):
        # self.df = df
        self.min_support = min_support
        self.min_confidence = min_confidence

    def find_frequent_patterns(self, fp_tree, item_counts, min_support):
        def mine_tree(tree, prefix, frequent_patterns):
            for item, nodes in tree.header_table.items():
                new_prefix = prefix + [item]
                support = sum(node.count for node in nodes)
                if support >= min_support:
                    frequent_patterns[tuple(new_prefix)] = support

                    paths = tree.get_prefix_paths(item)
                    conditional_tree = FPTree()
                    conditional_item_counts = defaultdict(int)
                    for path, count in paths:
                        for p_item in path:
                            conditional_item_counts[p_item] += count
                        conditional_tree.add_transaction(path, count)

                    if conditional_item_counts:
                        mine_tree(conditional_tree, new_prefix, frequent_patterns)

        frequent_patterns = {}
        mine_tree(fp_tree, [], frequent_patterns)
        return frequent_patterns

    
    def find_association_rules(self, frequent_patterns):
        def generate_subset(itemset):
            return list(chain(*[combinations(itemset, i) for i in range(1, len(itemset))]))
        rules = []
        for pattern, support in frequent_patterns.items():
            if len(pattern) < 2:
                continue
            subsets = generate_subset(pattern)
            for subset in subsets:
                remain = tuple(set(pattern) - set(subset))
                # print(remain)
                if remain:
                    subset_support = frequent_patterns.get(subset, 0)
                    # print(subset_support)
                    if subset_support > 0:
                        confidence = support / subset_support
                        if confidence >= self.min_confidence:
                            rules.append((subset, remain, support, confidence))
        return rules


    def fit(self, df):
        transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
        total_transactions = df.shape[0]
        min_support = total_transactions * self.min_support
        # print(min_support)
        item_counts = defaultdict(int)
        # item count
        for transaction in transactions:
            for item in transaction:
                item_counts[item] += 1
        frequent_items = {item: count for item, count in item_counts.items() if count >= min_support}
        # filter the item for each transaction which is not in frequent items
        filtered_transactions = []
        for transaction in transactions:
            filtered_transactions.append([item for item in transaction if item in frequent_items])
        # build the FPTree
        fp_tree = FPTree()
        fp_tree.build_tree(filtered_transactions, frequent_items)
        frequent_patterns = self.find_frequent_patterns(fp_tree, frequent_items, min_support)
        df_frequent_patterns = pd.DataFrame(frequent_patterns.items(), columns=["Pattern", "Frequency"])
        df_frequent_patterns["Pattern"] = df_frequent_patterns["Pattern"].apply(lambda x: ', '.join(x))
        # print(df_frequent_patterns['Pattern'])

        output_file = "frequent_patterns.csv"
        df_frequent_patterns.to_csv(output_file, sep=";", index=False, encoding="utf-8")
        
        association_rules = self.find_association_rules(frequent_patterns)
        # print(association_rules)
        print("\nAssociation Rules:")
        for rule in association_rules:
            antecedent = ', '.join(rule[0])
            consequent = ', '.join(rule[1])
            print(f"Rule: {antecedent} -> {consequent} | Support: {rule[2]} | Confidence: {rule[3]:.5f}")

        rules_df = pd.DataFrame(association_rules, columns=["Antecedent", "Consequent", "Support", "Confidence"])
        rules_df["Antecedent"] = rules_df["Antecedent"].apply(lambda x: ', '.join(x))
        rules_df["Consequent"] = rules_df["Consequent"].apply(lambda x: ', '.join(x))

        output_rules_file = "association_rules.csv"
        rules_df.to_csv(output_rules_file, sep=";", index=False, encoding="utf-8")
# df = pd.read_csv('basket.csv', sep=';')
# transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
# total_transactions = df.shape[0]

# item_counts = defaultdict(int)
# for transaction in transactions:
#     for item in transaction:
#         item_counts[item] += 1

# min_support = 0.01 * total_transactions
# frequent_items = {item: count for item, count in item_counts.items() if count >= min_support}
# filtered_transactions = []
# for transaction in transactions:
#     filtered_transactions.append([item for item in transaction if item in frequent_items])

# fp_tree = FPTree()
# fp_tree.build_tree(filtered_transactions, frequent_items)

# print("\nFP Tree:")
# fp_tree.print_tree()

# frequent_patterns = find_frequent_patterns(fp_tree, frequent_items, min_support)
# print("\nFrequent Patterns:")
# for pattern, support in frequent_patterns.items():
#     print(f"{pattern}: {support}")
# df = pd.DataFrame(frequent_patterns.items(), columns=["Pattern", "Frequency"])
# df["Pattern"] = df["Pattern"].apply(lambda x: ', '.join(x))
# print(df['Pattern'])

# output_file = "frequent_patterns.csv"
# df.to_csv(output_file, sep=";", index=False, encoding="utf-8")



# def find_association_rules(frequent_patterns, confidence_threshold):
#     def generate_subset(itemset):
#         return list(chain(*[combinations(itemset, i) for i in range(1, len(itemset))]))
#     rules = []
#     for pattern, support in frequent_patterns.items():
#         if len(pattern) < 2:
#             continue
#         subsets = generate_subset(pattern)
#         for subset in subsets:
#             remain = tuple(set(pattern) - set(subset))
#             print(remain)
#             if remain:
#                 subset_support = frequent_patterns.get(subset, 0)
#                 print(subset_support)
#                 if subset_support > 0:
#                     confidence = support / subset_support
#                     if confidence >= confidence_threshold:
#                         rules.append((subset, remain, support, confidence))
#     return rules

# confidence_threshold = 0.1

# association_rules = find_association_rules(frequent_patterns, confidence_threshold)
# print(association_rules)
# print("\nAssociation Rules:")
# for rule in association_rules:
#     antecedent = ', '.join(rule[0])
#     consequent = ', '.join(rule[1])
#     print(f"Rule: {antecedent} -> {consequent} | Support: {rule[2]} | Confidence: {rule[3]:.5f}")

# rules_df = pd.DataFrame(association_rules, columns=["Antecedent", "Consequent", "Support", "Confidence"])
# rules_df["Antecedent"] = rules_df["Antecedent"].apply(lambda x: ', '.join(x))
# rules_df["Consequent"] = rules_df["Consequent"].apply(lambda x: ', '.join(x))

# output_rules_file = "association_rules.csv"
# rules_df.to_csv(output_rules_file, sep=";", index=False, encoding="utf-8")

# print("\nAssociation Rules saved to:", output_rules_file)
df = pd.read_csv('basket.csv', sep=';')
fpgrowth = FPGrowth(0.001, 0.1)
fpgrowth.fit(df)