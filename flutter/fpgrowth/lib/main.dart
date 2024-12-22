import 'package:flutter/material.dart';
import 'package:fpgrowth/cart_page.dart';
import 'package:fpgrowth/product_page.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    var wid = MediaQuery.of(context).size.width;
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          elevation: 0,
          title: Padding(
            padding: EdgeInsets.symmetric(horizontal: wid * 0.2),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'FreshFusion',
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color.fromRGBO(128, 181, 0, 1)),
                ),
                Container(
                  width: wid * 0.3,
                  child: TabBar(
                    tabs: [
                      Tab(text: 'Home page'),
                      Tab(text: 'Products'),
                      Tab(text: 'Cart'),
                    ],
                    indicatorColor: Colors.black,
                    labelColor: Colors.black,
                    unselectedLabelColor: Colors.grey,
                  ),
                ),
                
              ],
            ),
          ),
        ),
        body: TabBarView(
          children: [
            Stack(
              children: [
                // Hình nền
                Positioned.fill(
                  child: Image.asset(
                    'assets/images/cover.jpg',
                    fit: BoxFit.fill,
                  ),
                ),
                // Lớp màu tối
                Positioned.fill(
                  child: Container(
                    color: Colors.black
                        .withOpacity(0.5),
                  ),
                ),
                // Nội dung
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'FreshFusion - Freshness daily, variety for every home!',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white, 
                        ),
                      ),
                      Text(
                        'Shopify Theme',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 16),
                      Text(
                        '99+ Product categories   |   999+ Products   |   Reasonable Price',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white,
                        ),
                      ),
                      SizedBox(height: 32),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Color.fromRGBO(77, 184, 0, 1),
                          padding: EdgeInsets.symmetric(
                              horizontal: 24, vertical: 12),
                        ),
                        child: Text(
                          'VIEW DETAILS →',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            ProductPage(),
            CartPage(),
            Center(child: Text('Giới thiệu')),
          ],
        ),
      ),
    );
  }
}

