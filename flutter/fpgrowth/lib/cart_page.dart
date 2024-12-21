import 'package:flutter/material.dart';

class CartPage extends StatefulWidget {
  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  List<Map<String, dynamic>> cartItems = [
    {
      'image': 'assets/images/peach.jpg',
      'name': 'C. v product',
      'price': 70.0,
      'quantity': 1,
    },
    {
      'image': 'assets/images/peach.jpg',
      'name': 'B. n product',
      'price': 80.0,
      'quantity': 1,
    },
  ];

  double getTotalPrice() {
    return cartItems.fold(0, (sum, item) => sum + item['price'] * item['quantity']);
  }

  void updateQuantity(int index, int delta) {
    setState(() {
      cartItems[index]['quantity'] =
          (cartItems[index]['quantity'] + delta).clamp(1, 100);
    });
  }

  void removeItem(int index) {
    setState(() {
      cartItems.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    var wid = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Phần ảnh bìa
            Container(
              height: 300,
              child: Stack(
                children: [
                  // Ảnh nền
                  Positioned.fill(
                    child: Image.asset(
                      'assets/images/cover.jpg',
                      fit: BoxFit.cover,
                    ),
                  ),
                  // Lớp màu tối
                  Positioned.fill(
                    child: Container(
                      color: Colors.black.withOpacity(0.7),
                    ),
                  ),
                  // Nội dung
                  Positioned(
                    left: wid * 0.08,
                    top: wid * 0.06,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'WELCOME TO OUR STORE',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Colors.greenAccent,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Your shopping cart',
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Positioned(
                    right: wid * 0.08,
                    bottom: wid * 0.07,
                    child: Row(
                      children: [
                        Text(
                          'Home',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          '   |   ',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          'Cart',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.greenAccent,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Danh sách sản phẩm trong giỏ hàng
            Padding(
              padding: EdgeInsets.symmetric(vertical: 20, horizontal: wid * 0.2),
              child: Column(
                children: [
                  ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: cartItems.length,
                    itemBuilder: (context, index) {
                      final item = cartItems[index];
                      return Card(
                        margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Image
                            Image.asset(
                              item['image'],
                              width: 200,
                              height: 200,
                              fit: BoxFit.cover,
                            ),
                            SizedBox(width: 16),
                            // Details
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item['name'],
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                    ),
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    '\$${item['price'].toStringAsFixed(2)}',
                                    style: TextStyle(
                                      color: Colors.green,
                                      fontSize: 16,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Column(
                              children: [
                                Row(
                                  children: [
                                    IconButton(
                                      onPressed: () => updateQuantity(index, -1),
                                      icon: Icon(Icons.remove),
                                    ),
                                    Text(
                                      item['quantity'].toString(),
                                      style: TextStyle(fontSize: 16),
                                    ),
                                    IconButton(
                                      onPressed: () => updateQuantity(index, 1),
                                      icon: Icon(Icons.add),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 4),
                                Text(
                                  '\$${(item['price'] * item['quantity']).toStringAsFixed(2)}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(width: 16),
                            // Remove Button
                            IconButton(
                              onPressed: () => removeItem(index),
                              icon: Icon(
                                Icons.close,
                                color: Colors.red,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  SizedBox(height: 20),
                  // Cart Totals
                  Padding(
                    padding: EdgeInsets.symmetric( horizontal: wid * 0.2),
                    child: Container(
                      padding: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey),
                      ),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Subtotal',
                                style: TextStyle(fontSize: 16),
                              ),
                              Text(
                                '\$${getTotalPrice().toStringAsFixed(2)}',
                                style: TextStyle(fontSize: 16),
                              ),
                            ],
                          ),
                          SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Total',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '\$${getTotalPrice().toStringAsFixed(2)}',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 20),
                          ElevatedButton(
                            onPressed: () {
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green, 
                              padding: EdgeInsets.symmetric(
                                horizontal: 32,
                                vertical: 16,
                              ),
                            ),
                            child: Text(
                              'Proceed to Checkout',
                              style: TextStyle(fontSize: 16, color: Colors.white),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
