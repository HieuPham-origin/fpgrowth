# Hướng Dẫn Cài Đặt và Chạy Dự Án

## Yêu Cầu
Trước khi bắt đầu, hãy chắc chắn rằng bạn đã cài đặt những phần mềm sau:

- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/) (Quản lý gói Python)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/) (Môi trường ảo Python)

## Cài Đặt Môi Trường Ảo

1. Mở terminal hoặc PowerShell trong thư mục dự án của bạn.

2. Tạo môi trường ảo:
   ```bash
   python -m venv venv
   ```

3. Kích hoạt môi trường ảo
    ```powershell
    .\venv\Scripts\activate
    ```

4. Cài đặt thư viện
```powershell
pip install -r requirements.txt
```
5. Chạy backend
```powershell
uvicorn app:app --reload
```

5.1 Ngừng lại bằng lệnh

```powershell
deactivate
```

6. Chạy frontend

```powershell
cd client
npm i
```

7. Bật frontend

```powershell
npm run dev
```
