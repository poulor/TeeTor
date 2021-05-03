#### Installation Instructions for TeeTor on WSL2 Ubuntu 20.04 LTS:

1. Clone the repository and switch into the new directory. For best performance, clone the repository in the Linux file system (~/home).
   ```
   git clone https://github.com/aSehat/TeeTor.git
   ```

2. Switch directories to the Teetor/Website 
   ```
   cd ./Website/
   ```

3. Install npm
   ```
   sudo apt install npm
   ```
   
4. Run the npm installer
   ```
   npm install
   ```

5. Switch directories to Teetor/Website/client
   ```
   cd ./client/
   ```

6. Run the npm installer
   ```
   npm install
   ```

7. Switch directories back to Teetor/Website
   ```
   cd ../
   ```

8. Run the npm script to start TeeTor
   ```
   npm run dev
   ```

9. All done! Setup is complete!
