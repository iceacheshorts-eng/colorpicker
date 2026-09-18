# Local Setup Instructions

Follow these steps to run this site locally on your Windows PC.

## Prerequisites
- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Steps to Run Locally

Since you do not have Git installed, you can download the project directly:

1. **Download the project**:
   - On the repository page, click the green **Code** button and select **Download ZIP**.
2. **Extract the files**:
   - Right-click the downloaded `.zip` file and select **Extract All...** to extract the files to a folder on your computer.
3. **Open a terminal**:
   - Open Command Prompt or PowerShell.
4. **Navigate to the project folder**:
   - Use the `cd` command to change your directory to the folder where you extracted the files. For example:
     ```cmd
     cd C:\path\to\extracted\folder
     ```
     *(Make sure you navigate into the folder that contains the `package.json` file)*
5. **Install dependencies**:
   - Run the following command to download and install all required packages:
     ```cmd
     npm install
     ```
6. **Start the development server**:
   - Once the installation is complete, start the local server by running:
     ```cmd
     npm run dev
     ```
7. **View the site**:
   - Open your web browser and go to [http://localhost:3000](http://localhost:3000). You should now see the site running locally!
