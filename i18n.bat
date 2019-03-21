@echo off

:: 사용법
:: node bin/i18n spreadsheet1.worksheet1,spreadsheet2.worksheet2 file_name
:: 예
:: node bin/i18n 1DMtt0P2J9qPs2F4HOEkzn80ceCMirBrRbzq_22cPw3g.ko_KR,1DMtt0P2J9qPs2F4HOEkzn80ceCMirBrRbzq_22cPw3g.en_US
node bin/i18n 1NrbGdR86h-HMEbZw4-5qVD8Hp5rSxGHJKy-FobDmwSw.ko_KR,1iLFYMBAsH62oyo9DmyKhHnrIVfVbeVddSPUdfJlKzGM.ko_KR,1QFIE4dpTIls6Hs39WX3oIiIeUzSaM6QTMtLlLpNwz6Q.ko_KR D:/Works/BT21/unity/cooky/Assets/Resources/Data/i18n/ko_KR.json
node bin/i18n 1NrbGdR86h-HMEbZw4-5qVD8Hp5rSxGHJKy-FobDmwSw.en_US,1iLFYMBAsH62oyo9DmyKhHnrIVfVbeVddSPUdfJlKzGM.en_US,1QFIE4dpTIls6Hs39WX3oIiIeUzSaM6QTMtLlLpNwz6Q.en_US D:/Works/BT21/unity/cooky/Assets/Resources/Data/i18n/en_US.json

:: I18nText.cs generate.
node bin/generate_enum D:/Works/BT21/unity/cooky/Assets/Resources/Data/i18n/ko_KR.json "D:/Works/BT21/unity/cooky/Assets/2. Scripts/i18n/Strings.cs"