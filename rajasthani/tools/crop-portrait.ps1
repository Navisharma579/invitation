Add-Type -AssemblyName System.Drawing

function Crop-Portrait {
    param([string]$srcPath, [string]$dstPath)
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $w = $src.Width
    $h = $src.Height
    
    # 9:16 aspect ratio: width = height * 9 / 16
    $cropW = [int]($h * 9.0 / 16.0)
    $cropX = [int](($w - $cropW) / 2)
    
    $dst = New-Object System.Drawing.Bitmap(1080, 1920)
    $g = [System.Drawing.Graphics]::FromImage($dst)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, 0, $cropW, $h)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, 1080, 1920)
    
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]93)
    $dst.Save($dstPath, $codec, $ep)
    $dst.Dispose()
    Write-Output "Generated: $dstPath"
}

Crop-Portrait -srcPath "rajasthani\assets\hero-landscape-green.jpg" -dstPath "rajasthani\assets\hero-portrait-green.jpg"
