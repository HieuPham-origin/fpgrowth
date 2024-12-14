import pandas as pd
from collections import defaultdict

# Đọc dữ liệu từ file CSV
df = pd.read_csv('data.csv', sep=';')

# Tạo danh sách các giao dịch
transactions = df['Baskets'].apply(lambda x: x.split(',')).tolist()
total_transactions = df.shape[0]

# Đếm tần suất của từng item trong tất cả các giao dịch
item_counts = defaultdict(int)
for transaction in transactions:
    for item in transaction:
        item_counts[item] += 1

# Xác định các item phổ biến (min_support = 0.1 trong ví dụ này)
min_support = 0.5
frequent_items = {item: count for item, count in item_counts.items() if count / total_transactions >= min_support}

# Lọc các giao dịch, chỉ giữ các item phổ biến
filtered_transactions = []
for transaction in transactions:
    filtered_transactions.append([item for item in transaction if item in frequent_items])

# In lại các giao dịch sau khi lọc
print("Filtered transactions:", filtered_transactions)

# Xây dựng cây FP
class FPTree:
    def __init__(self):
        self.tree = {}
        self.header_table = defaultdict(list)
    
    def add_transaction(self, transaction, count):
        current_node = self.tree
        for item in transaction:
            if item not in current_node:
                current_node[item] = {'count': 0, 'children': {}}
            # Cập nhật count cho item trong cây
            current_node[item]['count'] += count
            current_node = current_node[item]['children']  # Chuyển xuống level con
    
    def build_tree(self, transactions, item_counts):
        for transaction in transactions:
            # Sắp xếp giao dịch theo tần suất item (theo min_support) từ cao đến thấp
            transaction_sorted = sorted(transaction, key=lambda item: item_counts[item], reverse=True)
            # Thêm giao dịch vào cây FP
            self.add_transaction(transaction_sorted, 1)
            
    def print_tree(self, node=None, indent=0):
        if node is None:
            node = self.tree
        for key, child in node.items():
            print("  " * indent + f"{key} (count: {child['count']})")
            self.print_tree(child['children'], indent + 1)

# Tạo cây FP
fp_tree = FPTree()
fp_tree.build_tree(filtered_transactions, frequent_items)

# In cây FP
print("\nFP Tree:")
fp_tree.print_tree()

# Hàm khai thác các mẫu phổ biến từ cây FP
def mine_patterns(fp_tree, min_support, prefix=None):
    patterns = []
    if prefix is None:
        prefix = []
    
    # Duyệt qua cây FP và chỉ lấy các itemsets phổ biến
    for item, node in fp_tree.tree.items():
        new_prefix = prefix + [item]
        support = node['count']
        
        # Chỉ lấy các itemsets có support lớn hơn hoặc bằng min_support
        if support / total_transactions >= min_support:
            patterns.append(new_prefix)
        
        # Đệ quy khai thác các itemsets kết hợp (kết hợp nhiều item từ cây FP)
        if node['children']:
            sub_fp_tree = FPTree()
            sub_fp_tree.tree = node['children']
            patterns.extend(mine_patterns(sub_fp_tree, min_support, new_prefix))
    
    return patterns

# 1. Tìm các itemsets đơn lẻ (đã có trước đó)
initial_frequent_itemsets = [[item] for item in frequent_items]
print("hehe",initial_frequent_itemsets)
# 2. Khai thác các mẫu phổ biến từ cây FP (bao gồm các itemsets kết hợp)
patterns_from_tree = mine_patterns(fp_tree, min_support)

all_frequent_itemsets = set(tuple(itemset) for itemset in (initial_frequent_itemsets + patterns_from_tree))
print(len(all_frequent_itemsets))
print("\nFrequent itemsets (including itemsets from FP tree):")
print(all_frequent_itemsets)
