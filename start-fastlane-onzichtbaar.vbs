Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -File ""C:\Users\gianc\Desktop\fastlane.ps1""", 0, False