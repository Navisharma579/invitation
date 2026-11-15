$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class RoyalEmeraldFilter {
    public static void Transform(string srcPath, string dstPath, float emeraldWeight) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int w = src.Width;
            int h = src.Height;
            using (Bitmap dst = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData dstData = dst.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                
                int stride = srcData.Stride;
                int bytes = Math.Abs(stride) * h;
                byte[] rgbValues = new byte[bytes];
                byte[] dstValues = new byte[bytes];
                
                System.Runtime.InteropServices.Marshal.Copy(srcData.Scan0, rgbValues, 0, bytes);
                
                for (int y = 0; y < h; y++) {
                    int row = y * stride;
                    for (int x = 0; x < w; x++) {
                        int idx = row + x * 4;
                        byte b = rgbValues[idx];
                        byte g = rgbValues[idx + 1];
                        byte r = rgbValues[idx + 2];
                        byte a = rgbValues[idx + 3];
                        
                        // Check if pixel is gold / yellow / flame (R > 140, G > 100, B < G)
                        bool isGold = (r > 130 && g > 90 && (r - b > 40) && Math.Abs(r - g) < 55);
                        bool isHighlight = (r > 210 && g > 200 && b > 170);
                        
                        if (isGold || isHighlight) {
                            // Preserve warm antique gold and radiant highlights
                            dstValues[idx] = b;
                            dstValues[idx + 1] = g;
                            dstValues[idx + 2] = r;
                        } else {
                            // Shift maroon / red / pink towards rich Royal Emerald & Jade
                            float brightness = (r * 0.299f + g * 0.587f + b * 0.114f);
                            
                            // Target Emerald palette: R: 18-45, G: 70-130, B: 45-85
                            float targetR = brightness * 0.22f;
                            float targetG = brightness * 0.72f;
                            float targetB = brightness * 0.42f;
                            
                            float newR = r * (1f - emeraldWeight) + targetR * emeraldWeight;
                            float newG = g * (1f - emeraldWeight) + targetG * emeraldWeight;
                            float newB = b * (1f - emeraldWeight) + targetB * emeraldWeight;
                            
                            dstValues[idx] = (byte)Math.Min(255, Math.Max(0, (int)newB));
                            dstValues[idx + 1] = (byte)Math.Min(255, Math.Max(0, (int)newG));
                            dstValues[idx + 2] = (byte)Math.Min(255, Math.Max(0, (int)newR));
                        }
                        dstValues[idx + 3] = a;
                    }
                }
                
                System.Runtime.InteropServices.Marshal.Copy(dstValues, 0, dstData.Scan0, bytes);
                src.UnlockBits(srcData);
                dst.UnlockBits(dstData);
                
                ImageCodecInfo codec = null;
                foreach (ImageCodecInfo c in ImageCodecInfo.GetImageEncoders()) {
                    if (c.MimeType == "image/jpeg") { codec = c; break; }
                }
                EncoderParameters ep = new EncoderParameters(1);
                ep.Param[0] = new EncoderParameter(Encoder.Quality, 93L);
                dst.Save(dstPath, codec, ep);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies "System.Drawing"

[RoyalEmeraldFilter]::Transform("rajasthani\assets\hero-landscape.jpg", "rajasthani\assets\hero-landscape-green.jpg", 0.75)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\hero-portrait.jpg", "rajasthani\assets\hero-portrait-green.jpg", 0.75)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\invite-landscape.jpg", "rajasthani\assets\invite-landscape-green.jpg", 0.85)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\invite-portrait.jpg", "rajasthani\assets\invite-portrait-green.jpg", 0.85)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\couple-landscape.jpg", "rajasthani\assets\couple-landscape-green.jpg", 0.80)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\couple-portrait.jpg", "rajasthani\assets\couple-portrait-green.jpg", 0.80)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\venue-landscape.jpg", "rajasthani\assets\venue-landscape-green.jpg", 0.75)
[RoyalEmeraldFilter]::Transform("rajasthani\assets\venue-portrait.jpg", "rajasthani\assets\venue-portrait-green.jpg", 0.75)

Write-Output "Royal Emerald Transformation Complete!"
