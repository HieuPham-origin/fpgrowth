import 'package:flutter/material.dart';
import 'package:fpgrowth/products.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({super.key});

  @override
  State<ProductPage> createState() => _ProductPageState();
}

final List<Product> products = [
  Product(
    image: 'assets/images/peach2.jpg',
    name: 'Peach',
    price: 110.0,
  ),
  Product(
    image: 'assets/images/peach2.jpg',
    name: 'Papaya',
    price: 80.0,
  ),
  Product(
    image: 'assets/images/peach2.jpg',
    name: 'Mixed Berries',
    price: 70.0,
  ),
  Product(
    image: 'assets/images/peach.jpg',
    name: 'Mango',
    price: 33.0,
  ),
  Product(
    image: 'assets/images/peach.jpg',
    name: 'Pear',
    price: 39.0,
  ),
  Product(
    image: 'assets/images/peach.jpg',
    name: 'Kiwi',
    price: 55.0,
  ),
];

class _ProductPageState extends State<ProductPage> {
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
                  Positioned.fill(
                    child: Container(
                      color: Colors.black.withOpacity(0.7),
                    ),
                  ),
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
                          'Products',
                          style: TextStyle(
                            fontSize: 48,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Breadcrumb
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
                          'Products',
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
            // Phần sản phẩm
            Padding(
              padding:
                  EdgeInsets.symmetric(horizontal: wid * 0.2, vertical: 20),
              child: GridView.builder(
                shrinkWrap: true, // Cho phép GridView có chiều cao động
                physics:
                    NeverScrollableScrollPhysics(), // Vô hiệu hóa cuộn của GridView
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3, // Số cột
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 0.8, // Tỷ lệ khung hình
                ),
                itemCount: products.length,
                itemBuilder: (context, index) {
                  return buildProductCard(products[index]);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

Widget buildProductCard(Product product) {
  return Card(
    elevation: 4,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    child: Column(
      children: [
        Container(
          height: 300,
          width: double.infinity,
          child: Image.asset(
            product.image,
            fit: BoxFit.fill,
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                product.name,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              SizedBox(height: 4),
              Text(
                '\$${product.price.toStringAsFixed(2)}',
                style: TextStyle(
                  color: Colors.green,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8.0, vertical: 20.0),
                child: ElevatedButton(
                  onPressed: () {
                    print('${product.name} added to cart');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green, 
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    'Add to Cart',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}
