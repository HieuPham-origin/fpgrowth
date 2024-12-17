from collections import defaultdict
import pandas as pd
from itertools import chain, combinations

class TreeNode:
    def __init__(self, item, count, parent):
        self.item = item
        self.count = count
        self.parent = parent
        self.children = {}
        self.link = None

    def increment(self, count):
        self.count += count


class FPTree:
    def __init__(self):
        self.root = TreeNode(None, 1, None)
        self.header_table = defaultdict(list)

    def add_transaction(self, transaction, count):
        current_node = self.root
        for item in transaction:
            if item not in current_node.children:
                new_node = TreeNode(item, 0, current_node)
                current_node.children[item] = new_node
                self.header_table[item].append(new_node)
            current_node.children[item].increment(count)
            current_node = current_node.children[item]

    def build_tree(self, transactions, item_counts):
        for transaction in transactions:
            transaction_sorted = sorted(transaction, key=lambda item: item_counts[item], reverse=True)
            self.add_transaction(transaction_sorted, 1)

    def get_prefix_paths(self, item):
        paths = []
        for node in self.header_table[item]:
            path = []
            current_node = node.parent
            while current_node and current_node.item:
                path.append(current_node.item)
                current_node = current_node.parent
            if path:
                paths.append((path[::-1], node.count))
        return paths

    def print_tree(self, node=None, indent=0):
        if node is None:
            node = self.root
        for child in node.children.values():
            print("  " * indent + f"{child.item} (count: {child.count})")
            self.print_tree(child, indent + 1)

def find_frequent_patterns(fp_tree, item_counts, min_support):
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

df = pd.read_csv('basket.csv', sep=';')
transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
total_transactions = df.shape[0]

item_counts = defaultdict(int)
for transaction in transactions:
    for item in transaction:
        item_counts[item] += 1

min_support = 0.01 * total_transactions
frequent_items = {item: count for item, count in item_counts.items() if count >= min_support}
filtered_transactions = []
for transaction in transactions:
    filtered_transactions.append([item for item in transaction if item in frequent_items])

fp_tree = FPTree()
fp_tree.build_tree(filtered_transactions, frequent_items)

print("\nFP Tree:")
fp_tree.print_tree()

frequent_patterns = find_frequent_patterns(fp_tree, frequent_items, min_support)
print("\nFrequent Patterns:")
for pattern, support in frequent_patterns.items():
    print(f"{pattern}: {support}")
df = pd.DataFrame(frequent_patterns.items(), columns=["Pattern", "Frequency"])
df["Pattern"] = df["Pattern"].apply(lambda x: ', '.join(x))
print(df['Pattern'])

output_file = "frequent_patterns.csv"
df.to_csv(output_file, sep=";", index=False, encoding="utf-8")

def generate_subset(itemset):
    return list(chain(*[combinations(itemset, i) for i in range(1, len(itemset))]))

def find_association_rules(frequent_patterns, confidence_threshold):
    rules = []
    for pattern, support in frequent_patterns.items():
        if len(pattern) < 2:
            continue
        subsets = generate_subset(pattern)
        for subset in subsets:
            remain = tuple(set(pattern) - set(subset))
            print(remain)
            if remain:
                subset_support = frequent_patterns.get(subset, 0)
                print(subset_support)
                if subset_support > 0:
                    confidence = support / subset_support
                    if confidence >= confidence_threshold:
                        rules.append((subset, remain, support, confidence))
    return rules

confidence_threshold = 0.1
association_rules = find_association_rules(frequent_patterns, confidence_threshold)
print(association_rules)
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

print("\nAssociation Rules saved to:", output_rules_file)
