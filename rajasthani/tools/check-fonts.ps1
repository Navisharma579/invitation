Add-Type -AssemblyName System.Drawing

$families = [System.Drawing.FontFamily]::Families
$found = @()
foreach ($f in $families) {
    if ($f.Name -match "Nirmala|Mangal|Georgia|Times|Arial|Cinzel|Garamond|Calibri|Segoe") {
        $found += $f.Name
    }
}
Write-Output "Matching fonts found:"
$found | Sort-Object | Get-Unique
