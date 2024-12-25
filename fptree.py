from collections import defaultdict

class TreeNode: # đại diện cho 1 node trong cây FP-Tree
    def __init__(self, item, count, parent):
        self.item = item # giá trị (trong trường hợp này là tên item)
        self.count = count # tần suất xuất hiện trong nhánh
        self.parent = parent # nút cha
        self.children = {} # tập hợp nút con của node đó
        self.link = None # liên kết của node tới các node khác

    def increment(self, count): # hàm tăng tần suất
        self.count += count


class FPTree: # đại diện cho cây FP-Tree
    def __init__(self):
        self.root = TreeNode(None, 1, None) # node gốc (node này là null)
        self.header_table = defaultdict(list) # nhóm các node theo item
    # xét từng transaction để tạo các nhánh cho cây FP-Tree
    def add_transaction(self, transaction, count):
        current_node = self.root # luôn bắt đầu từ node gốc (null)
        for item in transaction: # lặp qua các item
            if item not in current_node.children:
                new_node = TreeNode(item, 0, current_node) # tạo nút mới và liên kết nó với node hiện tại
                current_node.children[item] = new_node
                self.header_table[item].append(new_node) # thêm vào header table
            current_node.children[item].increment(count)
            current_node = current_node.children[item]
    # xây dựng cây
    def build_tree(self, transactions, item_counts):
        # với mỗi giao dịch sắp xếp item giảm dần theo tần suất và thêm vào cây
        for transaction in transactions:
            transaction_sorted = sorted(transaction, key=lambda item: item_counts[item], reverse=True)
            self.add_transaction(transaction_sorted, 1)
    # tìm đường dẫn tiền tố liên quan tới item (để tìm frequent patterns)
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
    # hàm show cây lên terminal
    def print_tree(self, node=None, indent=0):
        if node is None:
            node = self.root
        for child in node.children.values():
            print("  " * indent + f"{child.item} (count: {child.count})")
            self.print_tree(child, indent + 1)