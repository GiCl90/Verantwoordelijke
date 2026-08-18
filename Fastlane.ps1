$wshell = New-Object -ComObject WScript.Shell

while ($true) {
    # Probeer het venster te activeren
    $activated = $wshell.AppActivate("Fastlane")

    if ($activated) {
        # De "Alt"-truc: door een lege Alt-toets te simuleren denkt Windows dat de 
        # gebruiker interactie zoekt, waardoor de focus-lock direct wordt gebroken.
        $wshell.SendKeys("%")
    } else {
        # Als de app helemaal afgesloten was, start hem dan opnieuw op
        Start-Process "C:\Program Files\Google\Chrome\Application\chrome.exe" "--app=https://fastlaneapp.pages.dev"
        Start-Sleep -Seconds 2
        $wshell.AppActivate("Fastlane")
        $wshell.SendKeys("%")
    }

    # -----------------------------------------------------------------
    # TIJDSDUUR INSTELLING:
    # 5     = om te testen (laat deze even op 5 staan om te checken)
    # 14400 = 4 uur (standaard)
    # -----------------------------------------------------------------
    Start-Sleep -Seconds 14400
}