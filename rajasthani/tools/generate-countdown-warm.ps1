Add-Type -AssemblyName System.Drawing

# 1. Countdown Landscape
$src = [System.Drawing.Image]::FromFile("rajasthani\assets\hero-landscape.jpg")
$bmp = New-Object System.Drawing.Bitmap(1920, 1080)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$g.DrawImage($src, 0, 0, 1920, 1080)

# Soft semi-transparent warm ivory/gold gradient over the upper two-thirds
$gradRect = New-Object System.Drawing.Rectangle(0, 0, 1920, 720)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRect, [System.Drawing.Color]::FromArgb(220, 250, 244, 235), [System.Drawing.Color]::FromArgb(0, 250, 244, 235), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillRectangle($grad, $gradRect)
$grad.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$bmp.Save("rajasthani\assets\countdown-landscape.jpg", $codec, $ep)
$g.Dispose()
$bmp.Dispose()
$src.Dispose()

# 2. Countdown Portrait
$portSrc = [System.Drawing.Image]::FromFile("rajasthani\assets\hero-portrait.jpg")
$portBmp = New-Object System.Drawing.Bitmap(1080, 1920)
$gp = [System.Drawing.Graphics]::FromImage($portBmp)
$gp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$gp.DrawImage($portSrc, 0, 0, 1080, 1920)

$gradRectP = New-Object System.Drawing.Rectangle(0, 0, 1080, 1200)
$gradP = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRectP, [System.Drawing.Color]::FromArgb(220, 250, 244, 235), [System.Drawing.Color]::FromArgb(0, 250, 244, 235), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$gp.FillRectangle($gradP, $gradRectP)
$gradP.Dispose()

$portBmp.Save("rajasthani\assets\countdown-portrait.jpg", $codec, $ep)
$gp.Dispose()
$portBmp.Dispose()
$portSrc.Dispose()

Write-Output "Countdown warm gold assets created successfully!"
