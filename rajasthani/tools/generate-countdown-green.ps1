Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile("rajasthani\assets\hero-landscape-green.jpg")
$bmp = New-Object System.Drawing.Bitmap(1920, 1080)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Draw the palace in the lower half with a soft vignette
$g.DrawImage($src, 0, 0, 1920, 1080)

# Soft semi-transparent champagne-emerald gradient over the upper two-thirds so countdown numbers pop brilliantly
$gradRect = New-Object System.Drawing.Rectangle(0, 0, 1920, 680)
$grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRect, [System.Drawing.Color]::FromArgb(215, 12, 38, 28), [System.Drawing.Color]::FromArgb(0, 12, 38, 28), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillRectangle($grad, $gradRect)
$grad.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$bmp.Save("rajasthani\assets\countdown-landscape-green.jpg", $codec, $ep)

# And portrait
$portBmp = New-Object System.Drawing.Bitmap(1080, 1920)
$gp = [System.Drawing.Graphics]::FromImage($portBmp)
$gp.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$portSrc = [System.Drawing.Image]::FromFile("rajasthani\assets\hero-portrait-green.jpg")
$gp.DrawImage($portSrc, 0, 0, 1080, 1920)

$gradRectP = New-Object System.Drawing.Rectangle(0, 0, 1080, 1100)
$gradP = New-Object System.Drawing.Drawing2D.LinearGradientBrush($gradRectP, [System.Drawing.Color]::FromArgb(215, 12, 38, 28), [System.Drawing.Color]::FromArgb(0, 12, 38, 28), [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$gp.FillRectangle($gradP, $gradRectP)
$gradP.Dispose()

$portBmp.Save("rajasthani\assets\countdown-portrait-green.jpg", $codec, $ep)

$g.Dispose()
$bmp.Dispose()
$gp.Dispose()
$portBmp.Dispose()
$src.Dispose()
$portSrc.Dispose()

Write-Output "Generated countdown green assets!"
