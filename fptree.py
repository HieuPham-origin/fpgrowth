from collections import defaultdict

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