from collections import defaultdict
import pandas as pd

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

df = pd.read_csv('baskets.csv', sep=';')
transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
total_transactions = df.shape[0]

item_counts = defaultdict(int)
for transaction in transactions:
    for item in transaction:
        item_counts[item] += 1

min_support = 0.1 * total_transactions
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
