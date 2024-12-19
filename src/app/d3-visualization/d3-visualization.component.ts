import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-viz',
  templateUrl: './d3-visualization.component.html',
  styleUrls: ['./d3-visualization.component.scss'],
})
export class D3VizComponent {
  mappings = [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 6 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 },
    { source: 9, target: 10 },
    { source: 10, target: 11 },
    { source: 11, target: 12 },
    { source: 12, target: 13 },
    { source: 13, target: 14 },
    { source: 14, target: 15 },
    { source: 15, target: 16 },
    { source: 16, target: 17 },
    { source: 17, target: 18 },
    { source: 18, target: 19 },
    { source: 19, target: 20 },
    { source: 20, target: 21 },
    { source: 21, target: 22 },
    { source: 22, target: 23 },
    { source: 23, target: 24 },
    { source: 24, target: 25 },
    { source: 25, target: 1 },
    { source: 1, target: 26 },
    { source: 26, target: 27 },
    { source: 27, target: 28 },
    { source: 28, target: 29 },
    { source: 29, target: 30 },
    { source: 30, target: 31 },
    { source: 31, target: 32 },
    { source: 32, target: 33 },
    { source: 33, target: 34 },
    { source: 34, target: 35 },
    { source: 35, target: 36 },
    { source: 36, target: 37 },
    { source: 37, target: 38 },
    { source: 38, target: 39 },
    { source: 39, target: 40 },
    { source: 40, target: 41 },
    { source: 41, target: 42 },
    { source: 42, target: 43 },
    { source: 43, target: 44 },
    { source: 44, target: 45 },
    { source: 45, target: 46 },
    { source: 46, target: 47 },
    { source: 47, target: 48 },
    { source: 48, target: 49 },
    { source: 49, target: 50 },
    { source: 50, target: 51 },
    { source: 51, target: 52 },
    { source: 52, target: 53 },
    { source: 53, target: 54 },
    { source: 54, target: 55 },
    { source: 55, target: 56 },
    { source: 56, target: 57 },
    { source: 57, target: 58 },
    { source: 58, target: 59 },
    { source: 59, target: 60 },
    { source: 60, target: 61 },
    { source: 61, target: 62 },
    { source: 62, target: 63 },
    { source: 63, target: 64 },
    { source: 64, target: 65 },
    { source: 65, target: 66 },
    { source: 66, target: 67 },
    { source: 67, target: 68 },
    { source: 68, target: 69 },
    { source: 69, target: 70 },
    { source: 70, target: 71 },
    { source: 71, target: 72 },
    { source: 72, target: 73 },
    { source: 73, target: 74 },
    { source: 74, target: 75 },
    { source: 75, target: 76 },
    { source: 76, target: 77 },
    { source: 77, target: 78 },
    { source: 78, target: 79 },
    { source: 79, target: 80 },
    { source: 80, target: 81 },
    { source: 81, target: 82 },
    { source: 82, target: 83 },
    { source: 83, target: 84 },
    { source: 84, target: 85 },
    { source: 85, target: 86 },
    { source: 86, target: 87 },
    { source: 87, target: 88 },
    { source: 88, target: 89 },
    { source: 89, target: 90 },
    { source: 90, target: 91 },
    { source: 91, target: 92 },
    { source: 92, target: 93 },
    { source: 93, target: 94 },
    { source: 94, target: 95 },
    { source: 95, target: 96 },
    { source: 96, target: 97 },
    { source: 97, target: 98 },
    { source: 98, target: 99 },
    { source: 99, target: 100 },
    { source: 100, target: 101 },
    { source: 101, target: 102 },
    { source: 102, target: 103 },
    { source: 103, target: 104 },
    { source: 104, target: 105 },
    { source: 105, target: 106 },
    { source: 106, target: 107 },
    { source: 107, target: 108 },
    { source: 108, target: 109 },
    { source: 109, target: 110 },
    { source: 110, target: 111 },
    { source: 111, target: 112 },
    { source: 112, target: 113 },
    { source: 113, target: 114 },
    { source: 114, target: 115 },
    { source: 115, target: 116 },
    { source: 116, target: 117 },
    { source: 117, target: 118 },
    { source: 118, target: 119 },
    { source: 119, target: 120 },
    { source: 120, target: 121 },
    { source: 121, target: 122 },
    { source: 122, target: 123 },
    { source: 123, target: 124 },
    { source: 124, target: 125 },
    { source: 125, target: 126 },
    { source: 126, target: 127 },
    { source: 127, target: 128 },
    { source: 128, target: 129 },
    { source: 129, target: 130 },
    { source: 130, target: 131 },
    { source: 131, target: 132 },
    { source: 132, target: 133 },
    { source: 133, target: 134 },
    { source: 134, target: 135 },
    { source: 135, target: 136 },
    { source: 136, target: 137 },
    { source: 137, target: 138 },
    { source: 138, target: 139 },
    { source: 139, target: 140 },
    { source: 140, target: 141 },
    { source: 141, target: 142 },
    { source: 142, target: 143 },
    { source: 143, target: 144 },
    { source: 144, target: 145 },
    { source: 145, target: 146 },
    { source: 146, target: 147 },
    { source: 147, target: 148 },
    { source: 148, target: 149 },
    { source: 149, target: 150 },
    { source: 150, target: 151 },
    { source: 151, target: 152 },
    { source: 152, target: 153 },
    { source: 153, target: 154 },
    { source: 154, target: 155 },
    { source: 155, target: 156 },
    { source: 156, target: 157 },
    { source: 157, target: 158 },
    { source: 158, target: 159 },
    { source: 159, target: 160 },
    { source: 160, target: 161 },
    { source: 161, target: 162 },
    { source: 162, target: 163 },
    { source: 163, target: 164 },
    { source: 164, target: 165 },
    { source: 165, target: 166 },
    { source: 166, target: 167 },
    { source: 167, target: 168 },
    { source: 168, target: 169 },
    { source: 169, target: 170 },
    { source: 170, target: 171 },
    { source: 171, target: 172 },
    { source: 172, target: 173 },
    { source: 173, target: 174 },
    { source: 174, target: 175 },
    { source: 175, target: 176 },
    { source: 176, target: 177 },
    { source: 177, target: 178 },
    { source: 178, target: 179 },
    { source: 179, target: 180 },
    { source: 180, target: 181 },
    { source: 181, target: 182 },
    { source: 182, target: 183 },
    { source: 183, target: 184 },
    { source: 184, target: 185 },
    { source: 185, target: 186 },
    { source: 186, target: 187 },
    { source: 187, target: 188 },
    { source: 188, target: 189 },
    { source: 189, target: 190 },
    { source: 190, target: 191 },
    { source: 191, target: 192 },
    { source: 192, target: 193 },
    { source: 193, target: 194 },
    { source: 194, target: 195 },
    { source: 195, target: 196 },
    { source: 196, target: 197 },
    { source: 197, target: 198 },
    { source: 198, target: 199 },
    { source: 199, target: 200 },
    { source: 200, target: 201 },
    { source: 201, target: 202 },
    { source: 202, target: 203 },
    { source: 203, target: 204 },
    { source: 204, target: 205 },
    { source: 205, target: 206 },
    { source: 206, target: 207 },
    { source: 207, target: 208 },
    { source: 208, target: 209 },
    { source: 209, target: 210 },
    { source: 210, target: 211 },
    { source: 211, target: 212 },
    { source: 212, target: 213 },
    { source: 213, target: 214 },
    { source: 214, target: 215 },
    { source: 215, target: 216 },
    { source: 216, target: 217 },
    { source: 217, target: 218 },
    { source: 218, target: 219 },
    { source: 219, target: 220 },
    { source: 220, target: 221 },
    { source: 221, target: 222 },
    { source: 222, target: 223 },
    { source: 223, target: 224 },
    { source: 224, target: 225 },
    { source: 225, target: 226 },
    { source: 226, target: 227 },
    { source: 227, target: 228 },
    { source: 228, target: 229 },
    { source: 229, target: 230 },
    { source: 230, target: 231 },
    { source: 231, target: 232 },
    { source: 232, target: 233 },
    { source: 233, target: 234 },
    { source: 234, target: 235 },
    { source: 235, target: 236 },
    { source: 236, target: 237 },
    { source: 237, target: 238 },
    { source: 238, target: 239 },
    { source: 239, target: 240 },
    { source: 240, target: 241 },
    { source: 241, target: 242 },
    { source: 242, target: 243 },
    { source: 243, target: 244 },
    { source: 244, target: 245 },
    { source: 245, target: 246 },
    { source: 246, target: 247 },
    { source: 247, target: 248 },
    { source: 248, target: 249 },
    { source: 249, target: 250 },
    { source: 250, target: 251 },
    { source: 251, target: 252 },
    { source: 252, target: 253 },
    { source: 253, target: 254 },
    { source: 254, target: 255 },
    { source: 255, target: 256 },
    { source: 256, target: 257 },
    { source: 257, target: 258 },
    { source: 258, target: 259 },
    { source: 259, target: 260 },
    { source: 260, target: 261 },
    { source: 261, target: 262 },
    { source: 262, target: 263 },
    { source: 263, target: 264 },
    { source: 264, target: 265 },
    { source: 265, target: 266 },
    { source: 266, target: 267 },
    { source: 267, target: 268 },
    { source: 268, target: 269 },
    { source: 269, target: 270 },
    { source: 270, target: 271 },
    { source: 271, target: 272 },
    { source: 272, target: 273 },
    { source: 273, target: 274 },
    { source: 274, target: 275 },
    { source: 275, target: 276 },
    { source: 276, target: 277 },
    { source: 277, target: 278 },
    { source: 278, target: 279 },
    { source: 279, target: 280 },
    { source: 280, target: 281 },
    { source: 281, target: 282 },
    { source: 282, target: 283 },
    { source: 283, target: 284 },
    { source: 284, target: 285 },
    { source: 285, target: 286 },
    { source: 286, target: 287 },
    { source: 287, target: 288 },
    { source: 288, target: 289 },
    { source: 289, target: 290 },
    { source: 290, target: 291 },
    { source: 291, target: 292 },
    { source: 292, target: 293 },
    { source: 293, target: 294 },
    { source: 294, target: 295 },
    { source: 295, target: 296 },
    { source: 296, target: 297 },
    { source: 297, target: 298 },
    { source: 298, target: 299 },
    { source: 299, target: 300 },
    { source: 300, target: 301 },
    { source: 301, target: 302 },
    { source: 302, target: 303 },
    { source: 303, target: 304 },
    { source: 304, target: 305 },
    { source: 305, target: 306 },
    { source: 306, target: 307 },
    { source: 307, target: 308 },
    { source: 308, target: 309 },
    { source: 309, target: 310 },
    { source: 310, target: 311 },
    { source: 311, target: 312 },
    { source: 312, target: 313 },
    { source: 313, target: 314 },
    { source: 314, target: 315 },
    { source: 315, target: 316 },
    { source: 316, target: 317 },
    { source: 317, target: 318 },
    { source: 318, target: 319 },
    { source: 319, target: 320 },
    { source: 320, target: 321 },
    { source: 321, target: 322 },
    { source: 322, target: 323 },
    { source: 323, target: 324 },
    { source: 324, target: 325 },
    { source: 325, target: 326 },
    { source: 326, target: 327 },
    { source: 327, target: 328 },
    { source: 328, target: 329 },
    { source: 329, target: 330 },
    { source: 330, target: 331 },
    { source: 331, target: 332 },
    { source: 332, target: 333 },
    { source: 333, target: 334 },
    { source: 334, target: 335 },
    { source: 335, target: 336 },
    { source: 336, target: 337 },
    { source: 337, target: 338 },
    { source: 338, target: 339 },
    { source: 339, target: 340 },
    { source: 340, target: 341 },
    { source: 341, target: 342 },
    { source: 342, target: 343 },
    { source: 343, target: 344 },
    { source: 344, target: 345 },
    { source: 345, target: 346 },
    { source: 346, target: 347 },
    { source: 347, target: 348 },
    { source: 348, target: 349 },
    { source: 349, target: 350 },
    { source: 350, target: 351 },
    { source: 351, target: 352 },
    { source: 352, target: 353 },
    { source: 353, target: 354 },
    { source: 354, target: 355 },
    { source: 355, target: 356 },
    { source: 356, target: 357 },
    { source: 357, target: 358 },
    { source: 358, target: 359 },
    { source: 359, target: 360 },
    { source: 360, target: 361 },
    { source: 361, target: 362 },
    { source: 362, target: 363 },
    { source: 363, target: 364 },
    { source: 364, target: 365 },
    { source: 365, target: 366 },
    { source: 366, target: 367 },
    { source: 367, target: 368 },
    { source: 368, target: 369 },
    { source: 369, target: 370 },
    { source: 370, target: 371 },
    { source: 371, target: 372 },
    { source: 372, target: 373 },
    { source: 373, target: 374 },
    { source: 374, target: 375 },
    { source: 375, target: 376 },
    { source: 376, target: 377 },
    { source: 377, target: 378 },
    { source: 378, target: 379 },
    { source: 379, target: 380 },
    { source: 380, target: 381 },
    { source: 381, target: 382 },
    { source: 382, target: 383 },
    { source: 383, target: 384 },
    { source: 384, target: 385 },
    { source: 385, target: 386 },
    { source: 386, target: 387 },
    { source: 387, target: 388 },
    { source: 388, target: 389 },
    { source: 389, target: 390 },
    { source: 390, target: 391 },
    { source: 391, target: 392 },
    { source: 392, target: 393 },
    { source: 393, target: 394 },
    { source: 394, target: 395 },
    { source: 395, target: 396 },
    { source: 396, target: 397 },
    { source: 397, target: 398 },
    { source: 398, target: 399 },
    { source: 399, target: 400 },
    { source: 400, target: 401 },
    { source: 401, target: 402 },
    { source: 402, target: 403 },
    { source: 403, target: 404 },
    { source: 404, target: 405 },
    { source: 405, target: 406 },
    { source: 406, target: 407 },
    { source: 407, target: 408 },
    { source: 408, target: 409 },
    { source: 409, target: 410 },
    { source: 410, target: 411 },
    { source: 411, target: 412 },
    { source: 412, target: 413 },
    { source: 413, target: 414 },
    { source: 414, target: 415 },
    { source: 415, target: 416 },
    { source: 416, target: 417 },
    { source: 417, target: 418 },
    { source: 418, target: 419 },
    { source: 419, target: 420 },
    { source: 420, target: 421 },
    { source: 421, target: 422 },
    { source: 422, target: 423 },
    { source: 423, target: 424 },
    { source: 424, target: 425 },
    { source: 425, target: 426 },
    { source: 426, target: 427 },
    { source: 427, target: 428 },
    { source: 428, target: 429 },
    { source: 429, target: 430 },
    { source: 430, target: 431 },
    { source: 431, target: 432 },
    { source: 432, target: 433 },
    { source: 433, target: 434 },
    { source: 434, target: 435 },
    { source: 435, target: 436 },
    { source: 436, target: 437 },
    { source: 437, target: 438 },
    { source: 438, target: 439 },
    { source: 439, target: 440 },
    { source: 440, target: 441 },
    { source: 441, target: 442 },
    { source: 442, target: 443 },
    { source: 443, target: 444 },
    { source: 444, target: 445 },
    { source: 445, target: 446 },
    { source: 446, target: 447 },
    { source: 447, target: 448 },
    { source: 448, target: 449 },
    { source: 449, target: 450 },
    { source: 450, target: 451 },
    { source: 451, target: 452 },
    { source: 452, target: 453 },
    { source: 453, target: 454 },
    { source: 454, target: 455 },
    { source: 455, target: 456 },
    { source: 456, target: 457 },
    { source: 457, target: 458 },
    { source: 458, target: 459 },
    { source: 459, target: 460 },
    { source: 460, target: 461 },
    { source: 461, target: 462 },
    { source: 462, target: 463 },
    { source: 463, target: 464 },
    { source: 464, target: 465 },
    { source: 465, target: 466 },
    { source: 466, target: 467 },
    { source: 467, target: 468 },
    { source: 468, target: 469 },
    { source: 469, target: 470 },
    { source: 470, target: 471 },
    { source: 471, target: 472 },
    { source: 472, target: 473 },
    { source: 473, target: 474 },
    { source: 474, target: 475 },
    { source: 475, target: 476 },
    { source: 476, target: 477 },
    { source: 477, target: 478 },
    { source: 478, target: 479 },
    { source: 479, target: 480 },
    { source: 480, target: 481 },
    { source: 481, target: 482 },
    { source: 482, target: 483 },
    { source: 483, target: 484 },
    { source: 484, target: 485 },
    { source: 485, target: 486 },
    { source: 486, target: 487 },
    { source: 487, target: 488 },
    { source: 488, target: 489 },
    { source: 489, target: 490 },
    { source: 490, target: 491 },
    { source: 491, target: 492 },
    { source: 492, target: 493 },
    { source: 493, target: 494 },
    { source: 494, target: 495 },
    { source: 495, target: 496 },
    { source: 496, target: 497 },
    { source: 497, target: 498 },
    { source: 498, target: 499 },
    { source: 499, target: 500 }
  ];

  private svg: any;
  private simulation: any;
  private nodes: any[] = [];
  private links: any[] = [];

  ngOnInit() {
    // Get unique nodes from mappings
    const nodeSet = new Set<number>();
    this.mappings.forEach((mapping) => {
      nodeSet.add(mapping.source);
      nodeSet.add(mapping.target);
    });
    this.nodes = Array.from(nodeSet).map((id) => ({ id }));
    this.links = this.mappings.map((m) => ({ ...m }));

    // Create SVG
    this.svg = d3
      .select('.network-container')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 1000);

    // Create force simulation
    this.simulation = d3
      .forceSimulation(this.nodes)
      .force(
        'link',
        d3
          .forceLink(this.links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(300, 200));

    // Draw links
    const link = this.svg
      .append('g')
      .selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-width', 2);

    // Add animated dash array to links

    link
      .style('stroke-dasharray', '5,5')
      .style('animation', 'dash 30s linear infinite');

    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes dash {
        to {
          stroke-dashoffset: -1000;
        }
      }
    `;
    document.head.appendChild(style);

    // Add marker to links
    link.attr('marker-end', 'url(#arrowhead)');

    // Draw nodes
    const node = this.svg
      .append('g')
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('fill', '#69b3a2');

    // Function to find all paths to root node
    const findPathsToRoot = (startNode: any, nodes: any[], links: any[]) => {
      const paths: any[][] = [];
      const visited = new Set();

      const dfs = (current: any, path: any[]) => {
        // If we reach the root node (assuming id === 'root' or index 0)
        const outgoingMappings = this.mappings.filter(
          (m) => m.source === current.id
        );
        if (
          outgoingMappings.length === 0 ||
          outgoingMappings.every((m) => visited.has(m.target))
        ) {
          paths.push([...path, current]);
          return;
        }

        visited.add(current.id);

        // Find all incoming links to the current node
        const outgoingLinks = links.filter((l) => l.source.id === current.id);

        for (const link of outgoingLinks) {
          const target = link.target;
          if (!visited.has(target.id)) {
            dfs(target, [...path, current]);
          }
        }

        visited.delete(current.id);
      };

      dfs(startNode, []);
      return paths;
    };

    // Add arrow marker for directed links
    this.svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#999');

    node
      .on('mouseover', (event: MouseEvent, d: any) => {
        // Find all paths from hovered node to root
        console.log(d);
        console.log(this.nodes);
        console.log(this.links);
        const paths = findPathsToRoot(d, this.nodes, this.links);

        console.log(paths);

        // Create a Set of nodes and links in the paths for efficient lookup
        const highlightedNodes = new Set();
        const highlightedLinks = new Set();

        paths.forEach((path) => {
          // Add all nodes in path to highlighted set
          path.forEach((node) => highlightedNodes.add(node));

          // Add links between consecutive nodes in path
          for (let i = 0; i < path.length - 1; i++) {
            const link = this.links.find(
              (l) =>
                (l.source === path[i] && l.target === path[i + 1]) ||
                (l.source === path[i + 1] && l.target === path[i])
            );
            if (link) highlightedLinks.add(link);
          }
        });

        // Highlight nodes in paths
        node.style('fill', (n: any) =>
          highlightedNodes.has(n) ? '#ff7f0e' : '#69b3a2'
        );

        // Highlight links in paths
        link
          .style('stroke', (l: any) =>
            highlightedLinks.has(l) ? '#ff7f0e' : '#999'
          )
          .style('stroke-width', (l: any) => (highlightedLinks.has(l) ? 3 : 2));
      })
      .on('mouseout', () => {
        // Reset styles on mouseout
        node.style('fill', '#69b3a2');
        link.style('stroke', '#999').style('stroke-width', 2);
      });

    // Add labels
    const labels = this.svg
      .append('g')
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .text((d: any) => d.id)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    // Update positions on simulation tick
    // Fix node positions after initial tick
    this.simulation.alphaDecay(0.2); // Increase decay rate for faster convergence
    this.simulation.velocityDecay(2); // Increase velocity decay for faster stabilization
    this.simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

      labels.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    });

    // Arrange nodes in 3 vertical columns based on mod 3
    const columnWidth = 300; // Width between columns
    const verticalSpacing = 50; // Vertical spacing between nodes
    const startX = 200; // Starting X position for first column
    const startY = 100; // Starting Y position

    // Group nodes by mod 3
    const columnNodes = [[], [], []] as any[];
    this.nodes.forEach(node => {
      const column = node.id % 3;
      columnNodes[column].push(node);
    });

    // Position nodes in columns
    columnNodes.forEach((nodes, columnIndex) => {
      nodes.forEach((node: any, rowIndex: any) => {
        node.fx = startX + (columnIndex * columnWidth);
        node.fy = startY + (rowIndex * verticalSpacing);
      });
    });

    // Reheat simulation briefly to apply new positions
    this.simulation.alpha(0.1).restart();
  }
}
