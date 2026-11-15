$csharpCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class EnhancedEmeraldFilter {
    public static void TransformWithSkinProtection(string srcPath, string dstPath, float emeraldWeight) {
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
                        
                        // Human skin tone detection in RGB
                        bool isSkin = (r > 130 && g > 85 && b > 65 && r > g && g > b && (r - g) >= 15 && (r - g) <= 85 && (g - b) >= 10 && (g - b) <= 65);
                        // Gold / brass lamp flame / yellow highlights
                        bool isGold = (r > 140 && g > 100 && (r - b > 40) && Math.Abs(r - g) < 55);
                        bool isBrightWhite = (r > 220 && g > 215 && b > 190);
                        
                        if (isSkin || isGold || isBrightWhite) {
                            // Preserve natural human skin, sacred flame, warm gold & white jasmine
                            dstValues[idx] = b;
                            dstValues[idx + 1] = g;
                            dstValues[idx + 2] = r;
                        } else {
                            // Deep Royal Emerald & Forest Jade
                            float brightness = (r * 0.299f + g * 0.587f + b * 0.114f);
                            float targetR = brightness * 0.18f;
                            float targetG = brightness * 0.72f;
                            float targetB = brightness * 0.38f;
                            
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

[EnhancedEmeraldFilter]::TransformWithSkinProtection("rajasthani\assets\venue-landscape.jpg", "rajasthani\assets\venue-landscape-green.jpg", 0.78)
[EnhancedEmeraldFilter]::TransformWithSkinProtection("rajasthani\assets\venue-portrait.jpg", "rajasthani\assets\venue-portrait-green.jpg", 0.78)
[EnhancedEmeraldFilter]::TransformWithSkinProtection("rajasthani\assets\couple-landscape.jpg", "rajasthani\assets\couple-landscape-green.jpg", 0.78)
[EnhancedEmeraldFilter]::TransformWithSkinProtection("rajasthani\assets\couple-portrait.jpg", "rajasthani\assets\couple-portrait-green.jpg", 0.78)

Write-Output "Enhanced Emerald Transformation with Skin Protection Complete!"
