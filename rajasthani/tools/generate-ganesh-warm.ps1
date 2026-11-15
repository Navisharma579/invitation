Add-Type -AssemblyName System.Drawing

function Create-Ganesh-Wall-Warm {
    param([int]$w, [int]$h, [string]$outPath)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    # 1. Base warm sandalwood ivory wall (from video)
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 244, 235))
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)
    $bgBrush.Dispose()
    
    # 2. Carved Arch in centre with gold outlines
    $archW = [int]($w * 0.58)
    $archH = [int]($h * 0.78)
    $archX = [int](($w - $archW) / 2)
    $archY = [int]($h * 0.12)
    
    $archPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 197, 160, 89), 4)
    $g.DrawArc($archPen, $archX, $archY, $archW, [int]($archH * 0.6), 180, 180)
    $g.DrawLine($archPen, $archX, [int]($archY + $archH * 0.3), $archX, $archY + $archH)
    $g.DrawLine($archPen, $archX + $archW, [int]($archY + $archH * 0.3), $archX + $archW, $archY + $archH)
    $archPen.Dispose()
    
    # Inner dashed line
    $dashPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(140, 216, 178, 110), 2)
    $dashPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    $g.DrawArc($dashPen, $archX + 16, $archY + 16, $archW - 32, [int]($archH * 0.6) - 16, 180, 180)
    $g.DrawLine($dashPen, $archX + 16, [int]($archY + $archH * 0.3), $archX + 16, $archY + $archH)
    $g.DrawLine($dashPen, $archX + $archW - 16, [int]($archY + $archH * 0.3), $archX + $archW, $archY + $archH)
    $dashPen.Dispose()
    
    # 3. Bottom rich espresso / deep teak ledge with gold trim (video theme)
    $ledgeH = [int]($h * 0.1)
    $ledgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 42, 33))
    $g.FillRectangle($ledgeBrush, 0, $h - $ledgeH, $w, $ledgeH)
    $ledgeBrush.Dispose()
    
    $goldLedgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(216, 178, 110), 3)
    $g.DrawLine($goldLedgePen, 0, $h - $ledgeH, $w, $h - $ledgeH)
    $goldLedgePen.Dispose()
    
    # Save JPEG
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $bmp.Save($outPath, $codec, $ep)
    
    $g.Dispose()
    $bmp.Dispose()
}

Create-Ganesh-Wall-Warm 1920 1080 "rajasthani\assets\ganesh-landscape.jpg"
Create-Ganesh-Wall-Warm 1080 1920 "rajasthani\assets\ganesh-portrait.jpg"
Write-Output "Ganesh warm assets created!"
