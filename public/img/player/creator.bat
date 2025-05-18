@echo off
setlocal enabledelayedexpansion

for /l %%i in (1,1,360) do (
    copy 1.png %%i.png
)

endlocal