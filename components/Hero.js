function Hero() {
    const canvasRef = React.useRef(null);
    const containerRef = React.useRef(null);

    const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let blocks = [];
        
        // Configuration
        const isoAngle = 0.523599; // 30 degrees in radians
        const tileWidth = 60; // Width of a single tile
        const tileHeight = tileWidth * Math.sin(isoAngle); // Height of a single tile
        const colors = [
            { top: '#0ea5e9', left: '#0284c7', right: '#0369a1' }, // Sky
            { top: '#94a3b8', left: '#64748b', right: '#475569' }, // Slate Light
            { top: '#334155', left: '#1e293b', right: '#0f172a' }, // Slate Dark
            { top: '#ffffff', left: '#e2e8f0', right: '#cbd5e1' }  // White
        ];

        const resizeCanvas = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
                initBlocks();
            }
        };

        class Block {
            constructor(gridX, gridY) {
                this.gridX = gridX;
                this.gridY = gridY;
                
                // Calculate screen position centered
                // Isometric projection formula
                this.originX = canvas.width / 2 + (this.gridX - this.gridY) * tileWidth;
                this.originY = canvas.height / 2 + (this.gridX + this.gridY) * tileHeight;
                
                this.height = 0;
                this.targetHeight = 0;
                this.state = 'idle'; // idle, growing, shrinking
                this.delay = Math.random() * 200;
                this.speed = Math.random() * 0.5 + 0.2; // Slower speed
                this.maxHeight = Math.random() * 80 + 20;
                
                this.colorSet = colors[Math.floor(Math.random() * colors.length)];
                
                // Mouse interaction
                this.hovered = false;
            }

            update(mouseX, mouseY) {
                // Random activation
                if (this.state === 'idle') {
                    if (this.delay > 0) {
                        this.delay--;
                    } else {
                        if (Math.random() > 0.99) {
                            this.state = 'growing';
                            this.targetHeight = this.maxHeight;
                        }
                    }
                } else if (this.state === 'growing') {
                    this.height += this.speed;
                    if (this.height >= this.targetHeight) {
                        this.height = this.targetHeight;
                        this.state = 'holding';
                        this.delay = Math.random() * 100 + 50;
                    }
                } else if (this.state === 'holding') {
                    if (this.delay > 0) {
                        this.delay--;
                    } else {
                        this.state = 'shrinking';
                    }
                } else if (this.state === 'shrinking') {
                    this.height -= this.speed;
                    if (this.height <= 0) {
                        this.height = 0;
                        this.state = 'idle';
                        this.delay = Math.random() * 200;
                        // Pick new random height/color for next time
                        this.maxHeight = Math.random() * 80 + 20;
                        this.colorSet = colors[Math.floor(Math.random() * colors.length)];
                    }
                }

                // Simple proximity check for mouse interaction
                // (True isometric picking is complex, using distance for effect)
                if (mouseX && mouseY) {
                    const dx = this.originX - mouseX;
                    const dy = (this.originY - this.height) - mouseY; // Check against top of block
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist < 100) {
                        if (this.state === 'idle' || this.state === 'shrinking') {
                            this.state = 'growing';
                            this.targetHeight = 100; // Grow taller when hovered
                        }
                    }
                }
            }

            draw() {
                if (this.height <= 0.1) return; // Don't draw if flat

                const x = this.originX;
                const y = this.originY - this.height; // Lifted by height

                // Draw Top Face
                ctx.beginPath();
                ctx.moveTo(x, y - tileHeight);
                ctx.lineTo(x + tileWidth, y);
                ctx.lineTo(x, y + tileHeight);
                ctx.lineTo(x - tileWidth, y);
                ctx.closePath();
                ctx.fillStyle = this.colorSet.top;
                ctx.fill();
                // ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                // ctx.stroke();

                // Draw Right Face
                ctx.beginPath();
                ctx.moveTo(x + tileWidth, y);
                ctx.lineTo(x + tileWidth, y + this.height + tileHeight); // extend down to base? No, draw relative to current y
                // Actually, to look 3D, side faces go down from the top face y to (y + height is wrong logic for "rising")
                // Let's rethink: The 'y' calculated above is the visual TOP. 
                // The bottom of the pillar is fixed at this.originY.
                // So the vertical edges go from (visual top) to (visual bottom).
                // Visual bottom is at this.originY.
                // Wait, standard isometric pillar:
                // Base center is originX, originY.
                // Top center is originX, originY - height.
                
                // Let's redraw with correct geometry for a pillar rising from ground
                const baseX = this.originX;
                const baseY = this.originY;
                const topX = this.originX;
                const topY = this.originY - this.height;

                // TOP FACE (at topY)
                ctx.beginPath();
                ctx.moveTo(topX, topY - tileHeight);
                ctx.lineTo(topX + tileWidth, topY);
                ctx.lineTo(topX, topY + tileHeight);
                ctx.lineTo(topX - tileWidth, topY);
                ctx.closePath();
                ctx.fillStyle = this.colorSet.top;
                ctx.fill();

                // RIGHT FACE
                ctx.beginPath();
                ctx.moveTo(topX + tileWidth, topY);
                ctx.lineTo(topX, topY + tileHeight);
                ctx.lineTo(baseX, baseY + tileHeight); // Bottom point
                ctx.lineTo(baseX + tileWidth, baseY); // Bottom right
                ctx.closePath();
                ctx.fillStyle = this.colorSet.left; // Swapped naming in config but visually right
                ctx.fill();

                // LEFT FACE
                ctx.beginPath();
                ctx.moveTo(topX - tileWidth, topY);
                ctx.lineTo(topX, topY + tileHeight);
                ctx.lineTo(baseX, baseY + tileHeight);
                ctx.lineTo(baseX - tileWidth, baseY);
                ctx.closePath();
                ctx.fillStyle = this.colorSet.right;
                ctx.fill();
                
                // Highlight edges
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(topX, topY + tileHeight);
                ctx.lineTo(baseX, baseY + tileHeight);
                ctx.stroke();
            }
        }

        const initBlocks = () => {
            blocks = [];
            // Create a grid of blocks covering the screen
            // Grid coordinates range roughly -10 to 10
            const rangeX = Math.ceil(canvas.width / tileWidth / 2) + 5;
            const rangeY = Math.ceil(canvas.height / tileHeight / 2) + 5;
            
            for (let x = -rangeX; x <= rangeX; x++) {
                for (let y = -rangeY; y <= rangeY; y++) {
                    // Create a "floor" shape pattern or random
                    if (Math.abs(x) + Math.abs(y) < 15) { // Diamond shape cluster
                         blocks.push(new Block(x, y));
                    }
                }
            }
            
            // Sort blocks by depth (painter's algorithm) to draw correctly
            // In iso: (x + y) determines depth
            blocks.sort((a, b) => (a.gridX + a.gridY) - (b.gridX + b.gridY));
        };

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        
        const handleMouseLeave = () => {
            mouseX = null;
            mouseY = null;
        };

        const animate = () => {
            ctx.fillStyle = '#0f172a'; // Slate-900 background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw a subtle grid on the "floor"
            /*
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            blocks.forEach(b => {
                const x = b.originX;
                const y = b.originY;
                ctx.beginPath();
                ctx.moveTo(x, y - tileHeight);
                ctx.lineTo(x + tileWidth, y);
                ctx.lineTo(x, y + tileHeight);
                ctx.lineTo(x - tileWidth, y);
                ctx.closePath();
                ctx.stroke();
            });
            */

            blocks.forEach(b => {
                b.update(mouseX, mouseY);
                b.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div id="hero" ref={containerRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden" data-name="hero" data-file="components/Hero.js">
            {/* Canvas Animation Background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 block w-full h-full" />
            
            {/* Radial Gradient Overlay for text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-radial from-slate-900/80 via-slate-900/90 to-slate-900 pointer-events-none"></div>
            
            {/* Extra fade at bottom to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

            {/* Content */}
            <div className="container-custom relative z-10 pt-20 pointer-events-none">
                <div className="max-w-3xl text-white pointer-events-auto">
                    <div className="inline-flex items-center space-x-2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-sky-500/50 shadow-lg shadow-sky-500/20">
                        <span className="icon-box text-sky-400 text-sm"></span>
                        <span className="text-sm font-medium tracking-wide text-sky-100">Αρχιτεκτονική & Κατασκευή</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl text-white">
                        Χτίζουμε το <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                            Μέλλον του Σπιτιού
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl drop-shadow-lg">
                        Από την μελέτη μέχρι την υλοποίηση, η TechnoHome.gr προσφέρει ολοκληρωμένες λύσεις ανακαίνισης με σύγχρονη αισθητική.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={scrollToContact} className="btn btn-primary shadow-lg shadow-sky-600/30 group border border-sky-500/20">
                            <span className="mr-2">Ζήτα Προσφορά</span>
                            <span className="icon-arrow-right group-hover:translate-x-1 transition-transform"></span>
                        </button>
                        <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="btn btn-outline border-slate-500 bg-slate-800/40 backdrop-blur hover:bg-white hover:text-slate-900">
                            Οι Υπηρεσίες μας
                        </button>
                    </div>
                </div>
            </div>
            
            <style>{`
                .bg-gradient-radial {
                    background: radial-gradient(circle at 30% 50%, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%);
                }
            `}</style>
        </div>
    );
}