Add-Type -AssemblyName System.Drawing

$srcDir = Resolve-Path "old-varanasi-invitation\assets"
$dstDir = Resolve-Path "rajasthani\assets"

function Save-Image {
    param(
        [System.Drawing.Bitmap]$bmp,
        [string]$outPath,
        [string]$format = "jpg",
        [long]$quality = 90
    )
    if ($format -eq "png") {
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        $bmp.Save($outPath, $codec, $encoderParams)
    }
    $size = (Get-Item $outPath).Length / 1024
    Write-Output "Saved: $outPath ($([math]::Round($size)) KB, $($bmp.Width)x$($bmp.Height))"
}

function Resize-And-Crop {
    param(
        [string]$srcPath,
        [int]$targetW,
        [int]$targetH,
        [string]$outPath,
        [string]$format = "jpg",
        [long]$quality = 90
    )
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $srcW = $src.Width
    $srcH = $src.Height
    
    $targetRatio = $targetW / $targetH
    $srcRatio = $srcW / $srcH
    
    if ($srcRatio -gt $targetRatio) {
        # Source is wider than target: crop left & right
        $cropH = $srcH
        $cropW = [int]($srcH * $targetRatio)
        $cropX = [int](($srcW - $cropW) / 2)
        $cropY = 0
    } else {
        # Source is taller than target: crop top & bottom
        $cropW = $srcW
        $cropH = [int]($srcW / $targetRatio)
        $cropX = 0
        $cropY = [int](($srcH - $cropH) / 2)
    }
    
    $destBmp = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    
    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()
    
    Save-Image -bmp $destBmp -outPath $outPath -format $format -quality $quality
    $destBmp.Dispose()
}

Write-Output "=== Processing Assets for Rajasthani Invitation ==="

# 1. Hero
$heroSrc = Join-Path $srcDir "rajasthani_palace_hero.jpg"
if (Test-Path $heroSrc) {
    Resize-And-Crop -srcPath $heroSrc -targetW 1920 -targetH 1080 -outPath (Join-Path $dstDir "hero-landscape.jpg") -quality 90
    Resize-And-Crop -srcPath $heroSrc -targetW 1080 -targetH 1920 -outPath (Join-Path $dstDir "hero-portrait.jpg") -quality 90
}

# 2. Lord Ganesha
$ganeshSrc = Join-Path $srcDir "lord_ganesha_gold.jpg"
if (Test-Path $ganeshSrc) {
    $gImg = [System.Drawing.Image]::FromFile($ganeshSrc)
    $gBmp = New-Object System.Drawing.Bitmap($gImg)
    Save-Image -bmp $gBmp -outPath (Join-Path $dstDir "ganesha.png") -format "png"
    Save-Image -bmp $gBmp -outPath (Join-Path $dstDir "ganesha.jpg") -format "jpg" -quality 92
    $gBmp.Dispose()
    $gImg.Dispose()
}

# 3. Groom
$groomSrc = Join-Path $srcDir "rajasthani_groom_rishi.jpg"
if (Test-Path $groomSrc) {
    $grImg = [System.Drawing.Image]::FromFile($groomSrc)
    $grBmp = New-Object System.Drawing.Bitmap($grImg)
    Save-Image -bmp $grBmp -outPath (Join-Path $dstDir "groom.png") -format "png"
    Save-Image -bmp $grBmp -outPath (Join-Path $dstDir "groom.jpg") -format "jpg" -quality 92
    $grBmp.Dispose()
    $grImg.Dispose()
}

# 4. Bride
$brideSrc = Join-Path $srcDir "rajasthani_bride_manisha.jpg"
if (Test-Path $brideSrc) {
    $brImg = [System.Drawing.Image]::FromFile($brideSrc)
    $brBmp = New-Object System.Drawing.Bitmap($brImg)
    Save-Image -bmp $brBmp -outPath (Join-Path $dstDir "bride.png") -format "png"
    Save-Image -bmp $brBmp -outPath (Join-Path $dstDir "bride.jpg") -format "jpg" -quality 92
    $brBmp.Dispose()
    $brImg.Dispose()
}

# 5. Invitation Frame
$invSrc = Join-Path $srcDir "clean_invitation_frame.jpg"
if (Test-Path $invSrc) {
    Resize-And-Crop -srcPath $invSrc -targetW 1080 -targetH 1920 -outPath (Join-Path $dstDir "invite-portrait.jpg") -quality 90
    Resize-And-Crop -srcPath $invSrc -targetW 1920 -targetH 1080 -outPath (Join-Path $dstDir "invite-landscape.jpg") -quality 90
}

# 6. Venue / Mandap
$venueSrc = Join-Path $srcDir "mandap_aarti.jpg"
if (Test-Path $venueSrc) {
    Resize-And-Crop -srcPath $venueSrc -targetW 1920 -targetH 1080 -outPath (Join-Path $dstDir "venue-landscape.jpg") -quality 90
    Resize-And-Crop -srcPath $venueSrc -targetW 1080 -targetH 1920 -outPath (Join-Path $dstDir "venue-portrait.jpg") -quality 90
}

# 7. Couple background
$coupleSrc = Join-Path $srcDir "bride_groom_meet.jpg"
if (Test-Path $coupleSrc) {
    Resize-And-Crop -srcPath $coupleSrc -targetW 1080 -targetH 1920 -outPath (Join-Path $dstDir "couple-portrait.jpg") -quality 90
    Resize-And-Crop -srcPath $coupleSrc -targetW 1920 -targetH 1080 -outPath (Join-Path $dstDir "couple-landscape.jpg") -quality 90
}

Write-Output "=== Asset Processing Complete ==="
