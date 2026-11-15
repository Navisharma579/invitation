Add-Type -AssemblyName System.Drawing

$srcPath = "rajasthani\assets\hero-landscape.jpg"
$outPath = "rajasthani\assets\hero-landscape-green.jpg"

$src = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Emerald color matrix: enhances green and deepens shadows into rich emerald/forest tones while preserving gold highlights
$cmElements = @(
    @(0.45, 0.25, 0.15, 0.0, 0.0),
    @(0.15, 0.85, 0.20, 0.0, 0.0),
    @(0.10, 0.30, 0.35, 0.0, 0.0),
    @(0.0,  0.0,  0.0,  1.0, 0.0),
    @(-0.08, 0.08, -0.05, 0.0, 1.0)
)
$cm = New-Object System.Drawing.Imaging.ColorMatrix(,$cmElements)
$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm)

$rect = New-Object System.Drawing.Rectangle(0, 0, $src.Width, $src.Height)
$g.DrawImage($src, $rect, 0, 0, $src.Width, $src.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$bmp.Save($outPath, $codec, $ep)
$g.Dispose()
$bmp.Dispose()
$src.Dispose()

Write-Output "Successfully generated: $outPath ($([math]::Round((Get-Item $outPath).Length / 1024)) KB)"
