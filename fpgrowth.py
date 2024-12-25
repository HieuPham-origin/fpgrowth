from collections import defaultdict
import pandas as pd
from itertools import chain, combinations
from fptree import FPTree
# Lớp để thực thi thuật toán FPGrowth để tìm frequent patterns và association rules
class FPGrowth:
    def __init__(self, min_support=0.01, min_confidence=0.1):
        # self.df = df
        self.min_support = min_support # ngưỡng tối thiểu để một mẫu được coi là phổ biến
        self.min_confidence = min_confidence # ngưỡng tối thiểu để 1 luật kết hợp đc coi là hợp lệ
    # dùng cây FP-Tree để tìm các frequent patterns
    def find_frequent_patterns(self, fp_tree, item_counts, min_support):
        # hàm khai thác cây để tìm frequent patterns 
        def mine_tree(tree, prefix, frequent_patterns):
            # xét từng node trong cây FP-Tree
            for item, nodes in tree.header_table.items():
                new_prefix = prefix + [item]
                support = sum(node.count for node in nodes) # tính support (cộng giá trị count của các nút chứa item)
                if support >= min_support:
                    # thêm vào frequent patterns
                    frequent_patterns[tuple(new_prefix)] = support
                    paths = tree.get_prefix_paths(item)
                    # Tạo cây điều kiện từ các đường dẫn
                    conditional_tree = FPTree()
                    conditional_item_counts = defaultdict(int)
                    for path, count in paths:
                        for p_item in path:
                            conditional_item_counts[p_item] += count
                        conditional_tree.add_transaction(path, count)

                    if conditional_item_counts:
                        mine_tree(conditional_tree, new_prefix, frequent_patterns)
        # khởi tạo dict chứa các frequent patterns
        frequent_patterns = {}
        mine_tree(fp_tree, [], frequent_patterns)
        return frequent_patterns

    # Hàm tạo các association rules
    def find_association_rules(self, frequent_patterns):
        # tạo ra các subset trong 1 frequent pattern
        def generate_subset(itemset):
            return list(chain(*[combinations(itemset, i) for i in range(1, len(itemset))]))
        # mảng lưu các association rules
        rules = []
        """xét từng frequent patterns
        Ta sẽ tạo ra các subset nếu số lượng phần tử trong mẫu >=2 
        Tạo xong thì chúng ta có Antecedent là subset đó
        Phần remain sẽ là Consequent
        Tính confidence theo công thức support(frequent patterns) / support(antecedent)
        Nếu >= min_confidence thì thêm vào rules
        # Return: list các rules
        """
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

    # Hàm để chạy thuật toán FPGrowth
    def fit(self, df):
        # lấy các transactions từ file
        transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
        total_transactions = df.shape[0] # tổng số transactions
        min_support = total_transactions * self.min_support # nhân để ra số support tối thiểu
        # print(min_support)
        item_counts = defaultdict(int)
        # duyệt qua từng transactions và thêm vào item_counts để có support của các item đơn lẻ
        for transaction in transactions:
            for item in transaction:
                item_counts[item] += 1
        # frequent items ban đầu chứa các item thỏa min_sup
        frequent_items = {item: count for item, count in item_counts.items() if count >= min_support}
        # filter the item for each transaction which is not in frequent items
        filtered_transactions = []
        # loại các item không thỏa điều kiện ở các transaction
        for transaction in transactions:
            filtered_transactions.append([item for item in transaction if item in frequent_items])
        # build the FPTree
        fp_tree = FPTree()
        fp_tree.build_tree(filtered_transactions, frequent_items)
        # tìm frequent patterns
        frequent_patterns = self.find_frequent_patterns(fp_tree, frequent_items, min_support)
        df_frequent_patterns = pd.DataFrame(frequent_patterns.items(), columns=["Pattern", "Frequency"])
        df_frequent_patterns["Pattern"] = df_frequent_patterns["Pattern"].apply(lambda x: ', '.join(x))
        # print(df_frequent_patterns['Pattern'])

        output_file = "frequent_patterns.csv"
        df_frequent_patterns.to_csv(output_file, sep=";", index=False, encoding="utf-8")
        # tìm association rules
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
# fpgrowth = FPGrowth(0.01, 0.1)
# fpgrowth.fit(df)