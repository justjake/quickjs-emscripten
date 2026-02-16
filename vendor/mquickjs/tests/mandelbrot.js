/* Mandelbrot display on a color terminal 
   (c) 2025 Fabrice Bellard
   MIT license 
*/
function mandelbrot(center_x, center_y, scale, w, h, max_it)
{
    var x1, y1, y2, i, x, y, cx, cy, fx, fy, i, t, c, s, c0;
    var colors = [ 14, 15, 7, 8, 0, 4, 12, 5, 13, 1, 9, 3, 11, 10, 2, 6];
    fx = scale * 0.5 / Math.min(w, h);
    fy = fx * 2;
    for(y1 = 0; y1 < h; y1++) {
        s = "";
        for(x1 = 0; x1 < w; x1++) {
            for(y2 = 0; y2 < 2; y2++) {
                cx = (x1 - w * 0.5) * fx + center_x;
                cy = (y1 + y2 * 0.5 - h * 0.5) * fy + center_y;
                x = 0;
                y = 0;
                for(i = 0; i < max_it && x * x + y * y < 4; i++) {
                    t = x * x - y * y + cx;
                    y = 2 * x * y + cy;
                    x = t;
                }
                if (i >= max_it) {
                    c = 0;
                } else {
                    c = colors[i % colors.length];
                }
                if (y2 == 0)
                    c0 = c;
            }
            s += "\x1b[" + (c0 >= 8 ? 82 + c0 : 30 + c0) + ";" + (c >= 8 ? 92 + c : 40 + c) + "m\u2580";
        }
        s += "\x1b[0m"; /* reset the colors */
        console.log(s);
    }
}

mandelbrot(-0.75, 0.0, 2.0, 80, 25, 50);
