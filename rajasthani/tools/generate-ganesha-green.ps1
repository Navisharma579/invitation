Add-Type -AssemblyName System.Drawing

$srcPath = "rajasthani\assets\ganesha.png"
$dstPath = "rajasthani\assets\ganesha-green.png"

$src = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Tint the background / aura into soft holy mint-emerald silk while making gold leaf shine
$cmElements = @(
    @(0.82, 0.12, 0.08, 0.0, 0.0),
    @(0.15, 0.95, 0.18, 0.0, 0.0),
    @(0.10, 0.22, 0.85, 0.0, 0.0),
    @(0.0,  0.0,  0.0,  1.0, 0.0),
    @(-0.04, 0.06, -0.02, 0.0, 1.0)
)
$cm = New-Object System.Drawing.Imaging.ColorMatrix(,$cmElements)
$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm)

$rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$g.DrawImage($src, $rect, 0, 0, $src.Width, $src.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

$bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$src.Dispose()

Write-Output "Generated: $dstPath"
