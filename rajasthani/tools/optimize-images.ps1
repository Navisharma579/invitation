Add-Type -AssemblyName System.Drawing

function Optimize-Png {
    param([string]$path, [int]$maxDim)
    $src = [System.Drawing.Image]::FromFile($path)
    $w = $src.Width
    $h = $src.Height
    if ($w -gt $maxDim -or $h -gt $maxDim) {
        if ($w -gt $h) {
            $newW = $maxDim
            $newH = [int]($h * $maxDim / $w)
        } else {
            $newH = $maxDim
            $newW = [int]($w * $maxDim / $h)
        }
    } else {
        $newW = $w
        $newH = $h
    }
    $dest = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($src, 0, 0, $newW, $newH)
    $g.Dispose()
    $src.Dispose()
    
    $tmp = $path + '.tmp.png'
    $dest.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Move-Item -Force $tmp $path
    $sz = [math]::Round((Get-Item $path).Length / 1024)
    Write-Output "Optimized $path to $sz KB ($newW x $newH)"
}

Optimize-Png -path "rajasthani\assets\ganesha.png" -maxDim 800
Optimize-Png -path "rajasthani\assets\groom.png" -maxDim 800
Optimize-Png -path "rajasthani\assets\bride.png" -maxDim 800
