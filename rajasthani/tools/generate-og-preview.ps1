Add-Type -AssemblyName System.Drawing

$w = 1200
$h = 630

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 1. Base Image: Jaipur Palace (hero-landscape.jpg)
$heroPath = Resolve-Path "assets\hero-landscape.jpg"
if (Test-Path $heroPath) {
    $hero = [System.Drawing.Image]::FromFile($heroPath)
    $targetRatio = [double]$w / [double]$h
    $srcRatio = [double]$hero.Width / [double]$hero.Height
    
    $srcW = [double]$hero.Width
    $srcH = [double]($srcW / $targetRatio)
    if ($srcH -gt $hero.Height) {
        $srcH = [double]$hero.Height
        $srcW = [double]($srcH * $targetRatio)
    }
    $srcX = [int](($hero.Width - $srcW) / 2)
    $srcY = [int](($hero.Height - $srcH) / 2)
    
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $g.DrawImage($hero, $destRect, $srcX, $srcY, [int]$srcW, [int]$srcH, [System.Drawing.GraphicsUnit]::Pixel)
    $hero.Dispose()
}

# 2. Rich Royal Vignette around the canvas edges
$fullRect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$outerGrad = New-Object System.Drawing.Drawing2D.GraphicsPath
$outerGrad.AddRectangle($fullRect)
$pbg = New-Object System.Drawing.Drawing2D.PathGradientBrush $outerGrad
$pbg.CenterPoint = New-Object System.Drawing.PointF 600.0, 315.0
$pbg.CenterColor = [System.Drawing.Color]::FromArgb(40, 20, 10, 8)
$pbg.SurroundColors = @([System.Drawing.Color]::FromArgb(220, 24, 10, 8))
$g.FillRectangle($pbg, 0, 0, $w, $h)
$pbg.Dispose()
$outerGrad.Dispose()

# 3. Center Royal Parchment / Velvet Card
$cardX = 130
$cardY = 36
$cardW = 940
$cardH = 558
$cardRect = New-Object System.Drawing.Rectangle $cardX, $cardY, $cardW, $cardH

# Card Background: Deep Royal Velvet Maroon with high-end contrast
$cardBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(238, 38, 14, 18))
$g.FillRectangle($cardBrush, $cardRect)
$cardBrush.Dispose()

# Subtle inner radial glow in card center
$cardInnerPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$cardInnerPath.AddRectangle($cardRect)
$cardPbg = New-Object System.Drawing.Drawing2D.PathGradientBrush $cardInnerPath
$cardPbg.CenterPoint = New-Object System.Drawing.PointF 600.0, 315.0
$cardPbg.CenterColor = [System.Drawing.Color]::FromArgb(85, 175, 45, 55)
$cardPbg.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 38, 14, 18))
$g.FillRectangle($cardPbg, $cardRect)
$cardPbg.Dispose()
$cardInnerPath.Dispose()

# 4. Ornate Gold Borders
$goldOuterPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 212, 175, 55)), 2.5
$g.DrawRectangle($goldOuterPen, $cardRect)
$goldOuterPen.Dispose()

# Inner thin gold border
$inX = $cardX + 7
$inY = $cardY + 7
$inW = $cardW - 14
$inH = $cardH - 14
$innerRect = New-Object System.Drawing.Rectangle $inX, $inY, $inW, $inH
$goldInnerPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(190, 232, 193, 112)), 1.0
$g.DrawRectangle($goldInnerPen, $innerRect)
$goldInnerPen.Dispose()

# Decorative 4 corner diamonds
$goldCornerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 212, 175, 55))
$corners = @(
    @(130, 36),
    @(1070, 36),
    @(130, 594),
    @(1070, 594)
)
foreach ($c in $corners) {
    $cx = [int]$c[0]
    $cy = [int]$c[1]
    $sz = 8
    $pts = @(
        (New-Object System.Drawing.Point $cx, ($cy - $sz)),
        (New-Object System.Drawing.Point ($cx + $sz), $cy),
        (New-Object System.Drawing.Point $cx, ($cy + $sz)),
        (New-Object System.Drawing.Point ($cx - $sz), $cy)
    )
    $g.FillPolygon($goldCornerBrush, $pts)
}
$goldCornerBrush.Dispose()

# 5. Typography Elements
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

function Render-Text {
    param(
        [string]$txt,
        [System.Drawing.Font]$fnt,
        [System.Drawing.Color]$col,
        [System.Drawing.Color]$shd,
        [float]$posY,
        [float]$offset
    )
    $bShd = New-Object System.Drawing.SolidBrush $shd
    $bCol = New-Object System.Drawing.SolidBrush $col
    
    $rShd = New-Object System.Drawing.RectangleF (100.0 + $offset), ($posY + $offset - 30.0), 1000.0, 60.0
    $rCol = New-Object System.Drawing.RectangleF 100.0, ($posY - 30.0), 1000.0, 60.0
    
    $g.DrawString($txt, $fnt, $bShd, $rShd, $sf)
    $g.DrawString($txt, $fnt, $bCol, $rCol, $sf)
    
    $bShd.Dispose()
    $bCol.Dispose()
}

$cGold = [System.Drawing.Color]::FromArgb(255, 235, 195, 115)
$cGoldBright = [System.Drawing.Color]::FromArgb(255, 245, 215, 140)
$cWhite = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$cIvory = [System.Drawing.Color]::FromArgb(255, 255, 253, 245)
$cMuted = [System.Drawing.Color]::FromArgb(235, 240, 230, 210)
$cShadow = [System.Drawing.Color]::FromArgb(220, 0, 0, 0)
$cSoftShadow = [System.Drawing.Color]::FromArgb(150, 0, 0, 0)

# Line 1: Devotional Mantra (y = 80)
$fMantra = New-Object System.Drawing.Font ("Nirmala UI", [float]15.0, [System.Drawing.FontStyle]::Bold)
Render-Text "॥ श्री गणेशाय नमः ॥" $fMantra $cGold $cShadow 82.0 1.5

# Line 2: Small Gold Ornament (y = 110)
$fOrn = New-Object System.Drawing.Font ("Georgia", [float]11.0, [System.Drawing.FontStyle]::Regular)
Render-Text "❖  ·  —  ·  ❖" $fOrn $cGold $cSoftShadow 112.0 1.0

# Line 3: Shubh Vivah Nimantran (y = 152)
$fShubh = New-Object System.Drawing.Font ("Nirmala UI", [float]21.0, [System.Drawing.FontStyle]::Bold)
Render-Text "॥ शुभविवाह निमंत्रण ॥" $fShubh $cIvory $cShadow 152.0 2.0

# Line 4: Monogram / Script Accent (y = 196)
$fMono = New-Object System.Drawing.Font ("Georgia", [float]13.5, [System.Drawing.FontStyle]::Italic)
Render-Text "—  R  &  M  —" $fMono $cGold $cSoftShadow 195.0 1.5

# Line 5: Hero Names (y = 254)
$fNames = New-Object System.Drawing.Font ("Georgia", [float]41.0, [System.Drawing.FontStyle]::Bold)
Render-Text "RISHI  &  MANISHA" $fNames $cWhite $cShadow 254.0 2.5

# Line 6: Hindi Names Subtitle (y = 310)
$fHindi = New-Object System.Drawing.Font ("Nirmala UI", [float]16.5, [System.Drawing.FontStyle]::Bold)
Render-Text "ऋषि  संग  मनीषा" $fHindi $cGoldBright $cShadow 310.0 1.5

# Line 7: Middle Ornate Divider Line with Diamond
$goldLinePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(160, 212, 175, 55)), 1.5
$g.DrawLine($goldLinePen, 420.0, 350.0, 570.0, 350.0)
$g.DrawLine($goldLinePen, 630.0, 350.0, 780.0, 350.0)
$goldLinePen.Dispose()

$diaBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 212, 175, 55))
$diaPts = @(
    (New-Object System.Drawing.Point 600, 344),
    (New-Object System.Drawing.Point 606, 350),
    (New-Object System.Drawing.Point 600, 356),
    (New-Object System.Drawing.Point 594, 350)
)
$g.FillPolygon($diaBrush, $diaPts)
$diaBrush.Dispose()

# Line 8: Wedding Date Hindi (y = 394)
$fDate = New-Object System.Drawing.Font ("Nirmala UI", [float]23.0, [System.Drawing.FontStyle]::Bold)
Render-Text "सोमवार, 14 दिसम्बर, 2026" $fDate $cIvory $cShadow 394.0 2.0

# Line 9: Wedding Date English (y = 435)
$fEngDate = New-Object System.Drawing.Font ("Georgia", [float]13.5, [System.Drawing.FontStyle]::Italic)
Render-Text "Monday, 14th December 2026" $fEngDate $cMuted $cSoftShadow 435.0 1.5

# Line 10: Location / City (y = 485)
$fCity = New-Object System.Drawing.Font ("Georgia", [float]13.5, [System.Drawing.FontStyle]::Bold)
Render-Text "JAIPUR, RAJASTHAN  ·  जयपुर, राजस्थान" $fCity $cGold $cShadow 485.0 1.5

# Line 11: Family Invitation Note (y = 538)
$fFam = New-Object System.Drawing.Font ("Nirmala UI", [float]12.5, [System.Drawing.FontStyle]::Regular)
Render-Text "मिश्र एवं शर्मा परिवार का स्नेहभरा निमंत्रण" $fFam $cMuted $cSoftShadow 536.0 1.5

# 6. Save JPEG with high quality (< 250 KB)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$outPath1 = "assets\og-preview.jpg"
$outPath2 = "rajasthani\assets\og-preview.jpg"

$bmp.Save($outPath1, $codec, $ep)
$bmp.Save($outPath2, $codec, $ep)

$sizeKb = [math]::Round((Get-Item $outPath1).Length / 1024)
Write-Output "Successfully generated: $outPath1 ($sizeKb KB, ${w}x${h})"

$g.Dispose()
$bmp.Dispose()
