Add-Type -AssemblyName System.Drawing

function Create-Ganesh-Wall {
    param([int]$w, [int]$h, [string]$outPath)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    # 1. Base soft ivory mint wall
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(248, 252, 249))
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)
    $bgBrush.Dispose()
    
    # 2. Carved Arch in centre with gold & emerald outlines
    $archW = [int]($w * 0.55)
    $archH = [int]($h * 0.75)
    $archX = [int](($w - $archW) / 2)
    $archY = [int]($h * 0.15)
    
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
    $g.DrawLine($dashPen, $archX + $archW - 16, [int]($archY + $archH * 0.3), $archX + $archW - 16, $archY + $archH)
    $dashPen.Dispose()
    
    # 3. Bottom emerald ledge with gold trim
    $ledgeH = [int]($h * 0.1)
    $ledgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(14, 56, 41))
    $g.FillRectangle($ledgeBrush, 0, $h - $ledgeH, $w, $ledgeH)
    $ledgeBrush.Dispose()
    
    $goldLedgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(216, 178, 110), 3)
    $g.DrawLine($goldLedgePen, 0, $h - $ledgeH, $w, $h - $ledgeH)
    $goldLedgePen.Dispose()
    
    # 4. Top mango leaf toran (आम्रपल्लव)
    $leafBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 105, 65))
    $leafPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(197, 160, 89), 1)
    for ($x = 0; $x -lt $w; $x += 40) {
        $pts = @(
            New-Object System.Drawing.Point($x, 0),
            New-Object System.Drawing.Point($x + 20, 36),
            New-Object System.Drawing.Point($x + 40, 0)
        )
        $g.FillPolygon($leafBrush, $pts)
        $g.DrawPolygon($leafPen, $pts)
        
        # Golden marigold flower bead
        $marigoldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 150, 35))
        $g.FillEllipse($marigoldBrush, $x + 14, 28, 12, 12)
        $marigoldBrush.Dispose()
    }
    $leafBrush.Dispose()
    $leafPen.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $bmp.Save($outPath, $codec, $ep)
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Created: $outPath"
}

Create-Ganesh-Wall -w 1920 -h 1080 -outPath "rajasthani\assets\ganesh-landscape-green.jpg"
Create-Ganesh-Wall -w 1080 -h 1920 -outPath "rajasthani\assets\ganesh-portrait-green.jpg"
