@echo off
setlocal enabledelayedexpansion

:: Salva il nome di questo script per escluderlo
set "thisScript=%~nx0"

:: Cartella corrente
set "folder=%cd%"
cd /d "%folder%"

:: Inizializza contatore
set /a count=1

:: Cicla su tutti i file nella cartella
for %%F in (*.*) do (
    :: Salta il file batch stesso
    if /i not "%%~nxF"=="%thisScript%" (
        :: Estrae estensione
        set "ext=%%~xF"
        
        :: Rinomina il file con numero progressivo e stessa estensione
        ren "%%F" "!count!!ext!"
        
        :: Incrementa contatore
        set /a count+=1
    )
)

echo Fatto. Rinominati !count! file (escluso %thisScript%).
pause
