// @ts-nocheck
export function initLegacyApp(): void {

        /**
         * ============================================================================
         * 1. TOAST NOTIFICATION SYSTEM (Replaces native alert)
         * ============================================================================
         */
        let toastTimer = null;
        function showToast(message, duration = 3000) {
            const box = document.getElementById('toast-box');
            const msgEl = document.getElementById('toast-message');
            if (!box || !msgEl) return;

            msgEl.textContent = message;
            box.classList.remove('opacity-0', '-translate-y-2');
            box.classList.add('opacity-100', 'translate-y-0');

            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                box.classList.remove('opacity-100', 'translate-y-0');
                box.classList.add('opacity-0', '-translate-y-2');
            }, duration);
        }

        /**
         * ============================================================================
         * 2. DYNAMIC CHRISTMAS WISHES ENGINE (Auto-rotating + Custom Wishes)
         * ============================================================================
         */
        const wishes = [
            {
                text: "Chúc bạn một mùa Giáng sinh an lành, ấm áp bên gia đình và những người thương yêu. Mong mọi điều tốt đẹp nhất sẽ luôn gõ cửa nhà bạn!",
                author: "Gửi trao yêu thương 🎄",
                tag: "✨ An Lành"
            },
            {
                text: "Nguyện cầu ánh sáng lấp lánh của đêm Noel sẽ xua tan mọi muộn phiền, mang đến cho bạn thật nhiều sức khỏe, bình an và niềm vui trọn vẹn.",
                author: "Đêm Đông Ấm Áp ❄️",
                tag: "❄️ Ấm Áp"
            },
            {
                text: "Merry Christmas! Chúc mọi ước mơ nhỏ bé lẫn lớn lao của bạn trong năm mới sắp tới đều sẽ nở hoa rực rỡ như ánh sao trên đỉnh cây thông.",
                author: "Chúc Mừng Giáng Sinh 🌟",
                tag: "🌟 Hy Vọng"
            },
            {
                text: "Dù ngoài trời có se lạnh, mong trái tim bạn luôn được sưởi ấm bởi tiếng cười, tình thân và những cái ôm thật chặt trong đêm Giáng sinh này.",
                author: "Hơi Ấm Mùa Lễ Hội 🕯️",
                tag: "💖 Yêu Thương"
            },
            {
                text: "Chúc bạn một mùa lễ hội tràn đầy phép màu, túi luôn rủng rỉnh, công việc hanh thông và mỗi ngày trôi qua đều là một món quà đáng nhớ!",
                author: "Ông Già Noel Gửi Tặng 🎁",
                tag: "🎁 Hạnh Phúc"
            },
            {
                text: "Cảm ơn bạn đã luôn hiện diện và làm thế giới này trở nên dịu dàng hơn. Chúc bạn một Giáng sinh thật ngọt ngào, bình yên và ngập tràn hạnh phúc!",
                author: "Từ Trái Tim 💝",
                tag: "💖 Yêu Thương"
            },
            {
                text: "Khi tiếng chuông ngân vang khắp phố phường, chúc mọi điều may mắn, tài lộc và bình an sẽ nhẹ nhàng đáp xuống mái ấm thân yêu của bạn.",
                author: "Tiếng Chuông Ngân Vang 🔔",
                tag: "✨ An Lành"
            },
            {
                text: "Giáng sinh không chỉ là một ngày lễ, mà là khoảnh khắc ta chậm lại để trân trọng những người bên cạnh. Chúc bạn một mùa Noel thật đáng nhớ!",
                author: "Khoảnh Khắc Diệu Kỳ ✨",
                tag: "❄️ Ấm Áp"
            },
            {
                text: "Mong rằng từng bông tuyết rơi đêm nay sẽ mang theo hàng ngàn lời chúc tốt lành, giúp bạn luôn giữ vững nụ cười rạng rỡ trên môi.",
                author: "Mùa Đông Diệu Kỳ ⛄",
                tag: "🎁 Hạnh Phúc"
            },
            {
                text: "Chúc gia đình bạn luôn hòa thuận, sum vầy bên bàn tiệc ấm cúng và cùng nhau viết nên những kỷ niệm Giáng sinh đẹp nhất của năm nay.",
                author: "Sum Vầy Hạnh Phúc 🏡",
                tag: "💖 Yêu Thương"
            },
            {
                text: "Hãy để giai điệu Giáng sinh ngân vang và thắp sáng niềm tin trong bạn. Chúc bạn luôn mạnh mẽ, tỏa sáng và gặt hái thật nhiều thành công!",
                author: "Ánh Sao Hy Vọng ⭐",
                tag: "🌟 Hy Vọng"
            },
            {
                text: "Gửi đến bạn ngàn lời chúc bình an nhân dịp Giáng sinh. Mong rằng niềm vui hôm nay sẽ còn đọng mãi suốt cả năm mới đang đến rất gần!",
                author: "An Lành & Thịnh Vượng 🥂",
                tag: "✨ An Lành"
            }
        ];

        let currentWishIndex = 0;
        let wishIntervalSec = 10;
        let wishElapsedMs = 0;
        let lastWishTick = performance.now();
        let isWishPaused = false;

        function renderWish(index, animateTransition = true) {
            const safeIdx = (index + wishes.length) % wishes.length;
            currentWishIndex = safeIdx;
            const wish = wishes[safeIdx];

            const textEl = document.getElementById('wish-text');
            const authorEl = document.getElementById('wish-author');
            const tagEl = document.getElementById('wish-tag');
            const counterEl = document.getElementById('wish-counter');

            const applyContent = () => {
                textEl.textContent = `"${wish.text}"`;
                authorEl.textContent = `— ${wish.author}`;
                tagEl.textContent = wish.tag;
                counterEl.textContent = `${safeIdx + 1} / ${wishes.length}`;
            };

            if (!animateTransition) {
                applyContent();
            } else {
                textEl.classList.remove('wish-visible');
                textEl.classList.add('wish-hidden');
                authorEl.classList.remove('wish-visible');
                authorEl.classList.add('wish-hidden');

                setTimeout(() => {
                    applyContent();
                    textEl.classList.remove('wish-hidden');
                    textEl.classList.add('wish-visible');
                    authorEl.classList.remove('wish-hidden');
                    authorEl.classList.add('wish-visible');
                }, 260);
            }

            wishElapsedMs = 0;
            lastWishTick = performance.now();
        }

        function updateWishTimer(now) {
            if (isWishPaused) {
                lastWishTick = now;
                return;
            }
            const dt = Math.min(100, Math.max(0, now - lastWishTick));
            lastWishTick = now;
            wishElapsedMs += dt;

            const totalMs = wishIntervalSec * 1000;
            const ratio = Math.min(1, wishElapsedMs / totalMs);
            const remainSec = Math.max(1, Math.ceil((totalMs - wishElapsedMs) / 1000));

            const barEl = document.getElementById('wish-progress-bar');
            const cdEl = document.getElementById('wish-countdown');
            if (barEl) barEl.style.width = `${(ratio * 100).toFixed(1)}%`;
            if (cdEl) cdEl.textContent = `${remainSec}s`;

            if (wishElapsedMs >= totalMs) {
                renderWish(currentWishIndex + 1, true);
            }
        }

        // Bind Wish Navigation & Interval Selector Controls
        document.getElementById('btn-wish-prev').addEventListener('click', () => renderWish(currentWishIndex - 1, true));
        document.getElementById('btn-wish-next').addEventListener('click', () => renderWish(currentWishIndex + 1, true));

        function setWishInterval(sec) {
            wishIntervalSec = sec;
            wishElapsedMs = 0;
            lastWishTick = performance.now();

            document.querySelectorAll('.interval-btn').forEach(btn => {
                const isActive = parseInt(btn.dataset.interval, 10) === sec;
                btn.classList.toggle('bg-amber-400/25', isActive);
                btn.classList.toggle('text-amber-200', isActive);
                btn.classList.toggle('font-semibold', isActive);
                btn.classList.toggle('border', isActive);
                btn.classList.toggle('border-amber-400/30', isActive);
            });
            showToast(`Lời chúc sẽ tự đổi sau mỗi ${sec} giây ⏱️`);
        }

        document.querySelectorAll('.interval-btn').forEach(btn => {
            btn.addEventListener('click', () => setWishInterval(parseInt(btn.dataset.interval, 10)));
        });

        /**
         * ============================================================================
         * 3. SAME-FOLDER MP3 PLAYLIST PLAYER & REAL-TIME BEAT ANALYSER
         * ============================================================================
         * Các file MP3 được đặt trong thư mục public/music.
         */
        const LOCAL_PLAYLIST = [
            { title: "We Wish You a Merry Christmas", file: "./music/wewishyouamerrychristmas.mp3" },
            { title: "Jingle Bells", file: "./music/jinglebells.mp3" },
            { title: "Last Christmas", file: "./music/lastchristmas.mp3" },
            { title: "Feliz Navidad", file: "./music/feliznavidad.mp3" }
        ];

        function formatTrackTime(sec) {
            if (!sec || !isFinite(sec) || sec < 0) return "0:00";
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        class FolderMP3MusicEngine {
            constructor(tracks) {
                this.playlist = tracks;
                this.currentTrackIndex = 0;
                this.isPlaying = false;
                this.isShuffle = false;
                this.volume = 0.80;
                this.musicPulse = 0;

                // HTML5 Audio + Web Audio API Analyser (auto-bypassed on file:// to avoid browser CORS mute)
                this.audioEl = document.getElementById('custom-audio-el');
                this.audioEl.volume = this.volume;
                this.isFileProtocol = window.location.protocol === 'file:';
                this.ctx = null;
                this.analyser = null;
                this.freqData = null;
                this.mediaSource = null;

                // Auto-advance to the next MP3 when current song finishes
                this.audioEl.addEventListener('ended', () => {
                    this.nextTrack();
                });

                this.audioEl.addEventListener('loadedmetadata', () => {
                    this.updateProgressUI();
                });

                this.audioEl.addEventListener('error', () => {
                    const current = this.playlist[this.currentTrackIndex];
                    const fileName = current ? current.file : '';
                    showToast(`Không tìm thấy file "${fileName}" cùng thư mục! 📂`);
                    this.isPlaying = false;
                    this.updateUI();
                });

                this.renderPlaylistSelect();
                this.loadTrackSource(0);
                this.updateUI();
            }

            initAudioContext() {
                if (!this.ctx) {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioCtx();
                }
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume().catch(() => {});
                }
                // Only attach Web Audio MediaElementSource when AudioContext is running over HTTP/HTTPS
                if (!this.isFileProtocol && !this.mediaSource && this.ctx.state === 'running') {
                    try {
                        this.analyser = this.ctx.createAnalyser();
                        this.analyser.fftSize = 64;
                        this.analyser.smoothingTimeConstant = 0.78;
                        this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
                        this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
                        this.mediaSource.connect(this.analyser);
                        this.analyser.connect(this.ctx.destination);
                    } catch (err) {
                        this.analyser = null;
                    }
                }
            }

            // Subtle sparkle chime on firework tap
            playSparkleChime() {
                if (!this.ctx || this.ctx.state !== 'running') return;
                const now = this.ctx.currentTime;
                const chimes = [1046.5, 1318.51, 1567.98, 1760.0];
                const freq = chimes[Math.floor(Math.random() * chimes.length)];
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.0001, now);
                gain.gain.linearRampToValueAtTime(0.05 * this.volume, now + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.0004, now + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.28);
            }

            renderPlaylistSelect() {
                const selectEl = document.getElementById('track-select');
                selectEl.innerHTML = '';
                this.playlist.forEach((track, idx) => {
                    const opt = document.createElement('option');
                    opt.value = String(idx);
                    opt.textContent = `${idx + 1}. ${track.title}`;
                    selectEl.appendChild(opt);
                });
                selectEl.value = String(this.currentTrackIndex);
            }

            loadTrackSource(index) {
                const safeIdx = (index + this.playlist.length) % this.playlist.length;
                this.currentTrackIndex = safeIdx;
                const track = this.playlist[safeIdx];
                this.audioEl.src = encodeURI(track.file);
                this.audioEl.currentTime = 0;
                this.audioEl.volume = this.volume;
                this.audioEl.load();
            }

            selectTrack(index, autoPlay = true) {
                this.loadTrackSource(index);
                if (autoPlay) {
                    this.play(false);
                } else {
                    this.isPlaying = false;
                    this.updateUI();
                }
            }

            nextTrack() {
                if (this.isShuffle && this.playlist.length > 1) {
                    let nextIdx = this.currentTrackIndex;
                    while (nextIdx === this.currentTrackIndex) {
                        nextIdx = Math.floor(Math.random() * this.playlist.length);
                    }
                    this.selectTrack(nextIdx, true);
                } else {
                    this.selectTrack(this.currentTrackIndex + 1, true);
                }
            }

            prevTrack() {
                this.selectTrack(this.currentTrackIndex - 1, true);
            }

            toggleShuffle() {
                this.isShuffle = !this.isShuffle;
                const btn = document.getElementById('btn-shuffle');
                const label = document.getElementById('shuffle-label');
                btn.classList.toggle('bg-amber-400/20', this.isShuffle);
                btn.classList.toggle('text-amber-200', this.isShuffle);
                btn.classList.toggle('border-amber-400/35', this.isShuffle);
                btn.classList.toggle('bg-white/5', !this.isShuffle);
                btn.classList.toggle('text-slate-300', !this.isShuffle);
                btn.classList.toggle('border-white/10', !this.isShuffle);
                label.textContent = this.isShuffle ? 'Ngẫu nhiên' : 'Tuần tự';
                showToast(this.isShuffle ? 'Đã bật phát ngẫu nhiên 🔀' : 'Đã chuyển sang phát tuần tự 🔁');
            }

            play(isAutoStart = false) {
                if (!isAutoStart) {
                    this.initAudioContext();
                }
                if (!this.audioEl.getAttribute('src')) {
                    this.loadTrackSource(this.currentTrackIndex);
                }
                this.audioEl.muted = false;
                this.audioEl.volume = this.volume;

                const playPromise = this.audioEl.play();
                if (playPromise && typeof playPromise.then === 'function') {
                    playPromise.then(() => {
                        this.isPlaying = true;
                        if (!isAutoStart) this.initAudioContext();
                        this.updateUI();
                    }).catch((err) => {
                        this.isPlaying = false;
                        if (err && err.name === 'NotAllowedError') {
                            showToast(
                                'Không phát được nhạc. Hãy bấm ổ khóa/cài đặt trang ở thanh địa chỉ → Âm thanh → Cho phép, sau đó tải lại trang.',
                                7000
                            );
                        } else if (!isAutoStart) {
                            const current = this.playlist[this.currentTrackIndex];
                            showToast(`Kiểm tra file "${current.file}" đã đặt cùng thư mục chưa nhé! 📂`);
                        }
                        this.updateUI();
                    });
                }
            }

            pause() {
                this.isPlaying = false;
                if (!this.audioEl.paused) {
                    this.audioEl.pause();
                }
                this.updateUI();
            }

            toggle() {
                if (this.isPlaying) this.pause();
                else this.play();
            }

            setVolume(val) {
                this.volume = Math.max(0, Math.min(1, val));
                this.audioEl.volume = this.volume;
            }

            seekToFraction(frac) {
                const clamped = Math.max(0, Math.min(1, frac));
                if (this.audioEl.duration && isFinite(this.audioEl.duration)) {
                    this.audioEl.currentTime = clamped * this.audioEl.duration;
                    this.updateProgressUI();
                }
            }

            updateProgressUI() {
                const fillEl = document.getElementById('track-progress-fill');
                const curEl = document.getElementById('track-time-current');
                const totEl = document.getElementById('track-time-total');

                const cur = this.audioEl.currentTime || 0;
                const dur = isFinite(this.audioEl.duration) ? this.audioEl.duration : 0;

                curEl.textContent = formatTrackTime(cur);
                totEl.textContent = formatTrackTime(dur);
                fillEl.style.width = dur > 0 ? `${Math.min(100, (cur / dur) * 100)}%` : '0%';
            }

            updateUI() {
                const track = this.playlist[this.currentTrackIndex];
                const title = track ? track.title : 'Nhạc Giáng Sinh';
                const sub = this.isPlaying
                    ? `Đang phát • Bài ${this.currentTrackIndex + 1} / ${this.playlist.length}`
                    : `Sẵn sàng • Bài ${this.currentTrackIndex + 1} / ${this.playlist.length}`;

                document.getElementById('track-title').textContent = title;
                document.getElementById('track-subtitle').textContent = sub;
                document.getElementById('mobile-track-title').textContent = title;
                document.getElementById('track-select').value = String(this.currentTrackIndex);

                document.querySelectorAll('.icon-play-sync').forEach(el => {
                    el.classList.toggle('hidden', this.isPlaying);
                });
                document.querySelectorAll('.icon-pause-sync').forEach(el => {
                    el.classList.toggle('hidden', !this.isPlaying);
                });
            }

            getVisualizerData(time) {
                if (this.analyser && this.isPlaying) {
                    this.analyser.getByteFrequencyData(this.freqData);
                    // Real-time bass + lower-mid energy for beat-reactive tree lights
                    let energy = 0;
                    for (let i = 1; i < 10; i++) energy += this.freqData[i];
                    const avg = energy / (9 * 255);
                    this.musicPulse = Math.max(this.musicPulse * 0.86, Math.min(1, avg * 1.9));
                    return this.freqData;
                }
                if (this.isPlaying) {
                    // Smooth animated pulse fallback when running directly via file://
                    const pulse = (Math.sin(time * 0.0085) * 0.5 + 0.5) * 0.72 + 0.18;
                    this.musicPulse = Math.max(this.musicPulse * 0.88, pulse);
                }
                return null;
            }
        }

        const musicEngine = new FolderMP3MusicEngine(LOCAL_PLAYLIST);

        // Bind Music UI Events (Play/Pause, Prev/Next, Seek, Volume, Shuffle)
        document.getElementById('btn-music-play').addEventListener('click', () => musicEngine.toggle());
        document.getElementById('btn-mobile-play').addEventListener('click', () => musicEngine.toggle());
        document.getElementById('btn-music-next').addEventListener('click', () => musicEngine.nextTrack());
        document.getElementById('btn-mobile-next').addEventListener('click', () => musicEngine.nextTrack());
        document.getElementById('btn-music-prev').addEventListener('click', () => musicEngine.prevTrack());
        document.getElementById('btn-shuffle').addEventListener('click', () => musicEngine.toggleShuffle());

        document.getElementById('track-progress-bar').addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            musicEngine.seekToFraction((e.clientX - rect.left) / rect.width);
        });

        document.getElementById('track-select').addEventListener('change', (e) => {
            if (e.target.value !== '') {
                musicEngine.selectTrack(parseInt(e.target.value, 10), true);
            }
        });

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            musicEngine.setVolume(parseInt(e.target.value, 10) / 100);
        });

        // Mini Visualizer Canvas Renderer + Track Progress Ticker
        const visCanvas = document.getElementById('visualizer-canvas');
        const visCtx = visCanvas.getContext('2d');
        let lastProgressSync = 0;
        function drawVisualizer(time) {
            if (time - lastProgressSync > 250) {
                lastProgressSync = time;
                musicEngine.updateProgressUI();
            }

            const w = visCanvas.width;
            const h = visCanvas.height;
            visCtx.clearRect(0, 0, w, h);

            const bars = 12;
            const gap = 2;
            const barW = (w - gap * (bars - 1)) / bars;
            const data = musicEngine.getVisualizerData(time);

            for (let i = 0; i < bars; i++) {
                let norm = 0.14;
                if (musicEngine.isPlaying && data) {
                    const binVal = data[Math.min(i * 2 + 1, data.length - 1)] / 255;
                    norm = Math.max(0.16, Math.min(1, binVal * 1.45));
                } else if (musicEngine.isPlaying) {
                    const waveA = Math.sin(time * 0.008 + i * 0.7) * 0.5 + 0.5;
                    const waveB = Math.cos(time * 0.013 - i * 0.5) * 0.5 + 0.5;
                    norm = 0.22 + (waveA * 0.55 + waveB * 0.45) * 0.68;
                } else {
                    norm = 0.14 + (Math.sin(time * 0.003 + i * 0.5) * 0.5 + 0.5) * 0.10;
                }

                const barH = Math.max(3, norm * (h - 2));
                const x = i * (barW + gap);
                const y = h - barH;

                const grad = visCtx.createLinearGradient(0, h, 0, 0);
                grad.addColorStop(0, '#f59e0b');
                grad.addColorStop(0.6, '#fcd34d');
                grad.addColorStop(1, '#a7f3d0');
                visCtx.fillStyle = grad;

                visCtx.beginPath();
                visCtx.roundRect(x, y, barW, barH, 2);
                visCtx.fill();
            }
        }


        /**
         * ============================================================================
         * 4. 3D-STYLE GLOWING CHRISTMAS TREE, AURORA, SNOW & FIREWORKS CANVAS
         * ============================================================================
         */
        const canvas = document.getElementById('christmas-canvas');
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Lighting Modes Configuration
        const LIGHT_MODES = {
            warm: {
                name: "Ấm áp cổ điển",
                colors: ['#fffbeb', '#fde68a', '#fbbf24', '#f59e0b', '#fb923c'],
                ribbonA: '#fde68a',
                ribbonB: '#f59e0b',
                starColor: '#fef08a',
                aurora: ['rgba(16, 185, 129, 0.13)', 'rgba(245, 158, 11, 0.08)']
            },
            festive: {
                name: "Rực rỡ lễ hội",
                colors: ['#fb7185', '#ef4444', '#fbbf24', '#34d399', '#fef08a'],
                ribbonA: '#fcd34d',
                ribbonB: '#fb7185',
                starColor: '#fde047',
                aurora: ['rgba(16, 185, 129, 0.15)', 'rgba(244, 63, 94, 0.09)']
            },
            icy: {
                name: "Xanh băng giá",
                colors: ['#f0f9ff', '#bae6fd', '#38bdf8', '#818cf8', '#e0f2fe'],
                ribbonA: '#e0f2fe',
                ribbonB: '#38bdf8',
                starColor: '#e0f2fe',
                aurora: ['rgba(56, 189, 248, 0.16)', 'rgba(129, 140, 248, 0.11)']
            },
            neon: {
                name: "Cầu vồng Neon",
                colors: ['#f472b6', '#c084fc', '#22d3ee', '#4ade80', '#facc15'],
                ribbonA: '#22d3ee',
                ribbonB: '#e879f9',
                starColor: '#f5d0fe',
                aurora: ['rgba(192, 132, 252, 0.14)', 'rgba(34, 211, 238, 0.14)']
            },
            rhythm: {
                name: "Nhấp nháy theo nhịp",
                colors: ['#fde047', '#f472b6', '#38bdf8', '#34d399', '#fb923c'],
                ribbonA: '#fde047',
                ribbonB: '#c084fc',
                starColor: '#fef08a',
                aurora: ['rgba(168, 85, 247, 0.15)', 'rgba(52, 211, 153, 0.13)']
            }
        };

        let currentLightMode = 'warm';
        let snowLevel = 1; // 0 = Tắt, 1 = Vừa, 2 = Dày
        const SNOW_LABELS = ['Tuyết: Tắt', 'Tuyết: Vừa', 'Tuyết: Dày'];
        // Interactive rotation & touch-drag inertia state (gentle auto-spin + boost on horizontal drag)
        const BASE_SPIN_SPEED = 0.0045;
        let treeAngle = 0;
        let treeAngularVelocity = BASE_SPIN_SPEED;
        let isDraggingTree = false;
        let activePointerId = null;
        let pointerDownX = 0;
        let pointerDownY = 0;
        let lastDragX = 0;
        let hasDraggedBeyondTap = false;

        // Scene entity arrays
        const foliageParticles = [];
        const ornamentLights = [];
        const ribbonParticles = [];
        const starsBg = [];
        const snowflakes = [];
        const fireworks = [];

        function initSceneEntities() {
            foliageParticles.length = 0;
            ornamentLights.length = 0;
            ribbonParticles.length = 0;
            starsBg.length = 0;
            snowflakes.length = 0;

            // Adapt particle density smoothly for 60fps on mobile phones
            const isSmallMobile = width <= 768;

            // 1. Background Twinkling Stars
            const starCount = isSmallMobile ? 75 : 120;
            for (let i = 0; i < starCount; i++) {
                starsBg.push({
                    x: Math.random(),
                    y: Math.random() * 0.72,
                    r: Math.random() * 1.5 + 0.4,
                    phase: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.002 + 0.0008
                });
            }

            // 2. 3D Pine Foliage Particles (Tiered conical layers)
            const foliageCount = isSmallMobile ? 520 : 880;
            for (let i = 0; i < foliageCount; i++) {
                const t = Math.pow(Math.random(), 0.78);
                const tierWave = 1 + 0.14 * Math.sin(t * Math.PI * 11);
                const maxR = t * tierWave;
                const r = maxR * (0.35 + 0.65 * Math.sqrt(Math.random()));
                const theta = Math.random() * Math.PI * 2;

                const greenShade = Math.random();
                let color = '#10b981';
                if (greenShade < 0.35) color = '#059669';
                else if (greenShade < 0.7) color = '#10b981';
                else if (greenShade < 0.9) color = '#34d399';
                else color = '#047857';

                foliageParticles.push({
                    t, r, theta,
                    size: Math.random() * 2.1 + 1.0,
                    color,
                    alpha: Math.random() * 0.45 + 0.35
                });
            }

            // 3. Dual Spiral Glowing Ribbons
            const ribbonCount = isSmallMobile ? 185 : 260;
            for (let i = 0; i < ribbonCount; i++) {
                const t = i / ribbonCount;
                const turns = 5.5;
                const thetaA = t * Math.PI * 2 * turns;
                const thetaB = thetaA + Math.PI;
                const r = t * 1.04 + 0.015;

                ribbonParticles.push({ t, r, theta: thetaA, strand: 0, phase: i * 0.12 });
                if (i % 2 === 0) {
                    ribbonParticles.push({ t, r: r * 0.98, theta: thetaB, strand: 1, phase: i * 0.15 + 1.5 });
                }
            }

            // 4. Twinkling Modern Lights & Ornaments
            const lightCount = isSmallMobile ? 95 : 135;
            for (let i = 0; i < lightCount; i++) {
                const t = 0.06 + Math.pow(Math.random(), 0.75) * 0.93;
                const tierWave = 1 + 0.13 * Math.sin(t * Math.PI * 11);
                const r = t * tierWave * (0.86 + Math.random() * 0.16);
                const theta = Math.random() * Math.PI * 2;

                ornamentLights.push({
                    t, r, theta,
                    colorIdx: Math.floor(Math.random() * 5),
                    baseSize: Math.random() * 2.6 + 2.2,
                    phase: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.0045 + 0.002
                });
            }

            // 5. Multi-depth Snowflakes
            const snowTotal = isSmallMobile ? 120 : 190;
            for (let i = 0; i < snowTotal; i++) {
                const depth = Math.random();
                snowflakes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    depth,
                    radius: 0.9 + depth * 2.8,
                    speedY: 0.45 + depth * 1.45,
                    drift: (Math.random() - 0.5) * 0.6,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Spawn interactive firework / star burst on click or tap
        function spawnFirework(x, y) {
            const palette = LIGHT_MODES[currentLightMode].colors;
            const count = 28;
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
                const speed = Math.random() * 3.8 + 1.4;
                fireworks.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 0.6,
                    life: 1,
                    decay: Math.random() * 0.018 + 0.014,
                    size: Math.random() * 2.4 + 1.2,
                    color: palette[Math.floor(Math.random() * palette.length)]
                });
            }
            musicEngine.playSparkleChime();
        }

        // Draw Northern Lights (Aurora Borealis) behind the tree
        function drawAurora(time) {
            const mode = LIGHT_MODES[currentLightMode];
            ctx.save();
            ctx.globalCompositeOperation = 'screen';

            for (let band = 0; band < 2; band++) {
                const grad = ctx.createLinearGradient(0, 0, width, height * 0.55);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.35, mode.aurora[band]);
                grad.addColorStop(0.65, mode.aurora[1 - band]);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                const baseY = height * (0.18 + band * 0.11);
                ctx.moveTo(0, baseY);

                for (let x = 0; x <= width; x += 60) {
                    const wave = Math.sin(x * 0.0025 + time * 0.00045 + band * 2.1) * 42
                               + Math.cos(x * 0.004 - time * 0.0003) * 20;
                    ctx.lineTo(x, baseY + wave);
                }
                ctx.lineTo(width, baseY + 170);
                ctx.lineTo(0, baseY + 170);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }

        // Draw Radiant Glowing 5-Pointed Star Topper
        function drawTopStar(cx, cy, radius, time, pulse) {
            const starColor = LIGHT_MODES[currentLightMode].starColor;
            ctx.save();
            ctx.translate(cx, cy);

            // Soft volumetric outer glow
            const glowR = radius * (4.2 + Math.sin(time * 0.004) * 0.4 + pulse * 1.1);
            const halo = ctx.createRadialGradient(0, 0, 1, 0, 0, glowR);
            halo.addColorStop(0, '#ffffff');
            halo.addColorStop(0.2, starColor);
            halo.addColorStop(0.55, 'rgba(251, 191, 36, 0.18)');
            halo.addColorStop(1, 'rgba(251, 191, 36, 0)');

            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(0, 0, glowR, 0, Math.PI * 2);
            ctx.fill();

            // Subtle rotating light rays
            ctx.rotate(Math.sin(time * 0.0012) * 0.15);
            ctx.fillStyle = '#fffef0';
            ctx.shadowColor = starColor;
            ctx.shadowBlur = 18;

            const spikes = 5;
            const outerR = radius * (1 + pulse * 0.12);
            const innerR = outerR * 0.44;
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const r = i % 2 === 0 ? outerR : innerR;
                const a = (i * Math.PI) / spikes - Math.PI / 2;
                const px = Math.cos(a) * r;
                const py = Math.sin(a) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        // Main Animation Loop
        function animate(time) {
            requestAnimationFrame(animate);

            // Update wish countdown progress
            updateWishTimer(time);

            // Decay music beat pulse smoothly
            musicEngine.musicPulse *= 0.92;
            const beatPulse = currentLightMode === 'rhythm'
                ? Math.max(musicEngine.musicPulse, (Math.sin(time * 0.007) * 0.5 + 0.5) * (musicEngine.isPlaying ? 0.3 : 0.75))
                : musicEngine.musicPulse * 0.45;

            // Update mini music visualizer
            drawVisualizer(time);

            // 1. Deep Midnight Sky Background Gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, '#020612');
            skyGrad.addColorStop(0.45, '#07142b');
            skyGrad.addColorStop(0.85, '#091f2e');
            skyGrad.addColorStop(1, '#05121d');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);

            // 2. Aurora Borealis
            drawAurora(time);

            // 3. Background Twinkling Stars
            for (let i = 0; i < starsBg.length; i++) {
                const s = starsBg[i];
                const alpha = 0.25 + 0.65 * (Math.sin(time * s.speed + s.phase) * 0.5 + 0.5);
                ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4. Compute Responsive Tree Dimensions & Center
            const isMobile = width <= 768;
            const treeHeight = Math.min(height * (isMobile ? 0.45 : 0.67), 560);
            const treeBaseRadius = treeHeight * (isMobile ? 0.42 : 0.39);
            const centerX = width * 0.5;
            const topY = height * (isMobile ? 0.115 : 0.13);
            const bottomY = topY + treeHeight;

            // Soft glowing base halo on the ground
            const groundGrad = ctx.createRadialGradient(centerX, bottomY + 12, 8, centerX, bottomY + 12, treeBaseRadius * 1.25);
            groundGrad.addColorStop(0, 'rgba(251, 191, 36, 0.22)');
            groundGrad.addColorStop(0.45, 'rgba(16, 185, 129, 0.10)');
            groundGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.save();
            ctx.scale(1, 0.32);
            ctx.fillStyle = groundGrad;
            ctx.beginPath();
            ctx.arc(centerX, (bottomY + 12) / 0.32, treeBaseRadius * 1.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Gentle auto-rotation around its axis, smoothly returning to base speed after user drag
            // Only pause auto-rotation when the user is actively dragging horizontally (not on a tap)
            if (!(isDraggingTree && hasDraggedBeyondTap)) {
                treeAngle += treeAngularVelocity;
                treeAngularVelocity += (BASE_SPIN_SPEED - treeAngularVelocity) * 0.05;
            }

            const renderQueue = [];
            const modeConfig = LIGHT_MODES[currentLightMode];
            const focalLength = 760;

            function project(t, r, theta) {
                const angle = theta + treeAngle;
                const radius = r * treeBaseRadius;
                const x3d = Math.cos(angle) * radius;
                const z3d = Math.sin(angle) * radius;
                const y3d = topY + t * treeHeight;

                const perspective = focalLength / (focalLength + z3d + 160);
                return {
                    x: centerX + x3d * perspective,
                    y: y3d + z3d * 0.08,
                    z: z3d,
                    scale: perspective
                };
            }

            // A. Pine Foliage Particles
            for (let i = 0; i < foliageParticles.length; i++) {
                const fp = foliageParticles[i];
                const proj = project(fp.t, fp.r, fp.theta);
                renderQueue.push({
                    type: 'foliage',
                    x: proj.x, y: proj.y, z: proj.z,
                    size: fp.size * proj.scale,
                    color: fp.color,
                    alpha: fp.alpha * (0.5 + 0.5 * proj.scale)
                });
            }

            // B. Spiral Glowing Ribbons
            for (let i = 0; i < ribbonParticles.length; i++) {
                const rp = ribbonParticles[i];
                const proj = project(rp.t, rp.r, rp.theta);
                const shimmer = 0.55 + 0.45 * Math.sin(time * 0.005 + rp.phase);
                renderQueue.push({
                    type: 'ribbon',
                    x: proj.x, y: proj.y, z: proj.z,
                    size: (2.2 + shimmer * 1.3 + beatPulse * 1.1) * proj.scale,
                    color: rp.strand === 0 ? modeConfig.ribbonA : modeConfig.ribbonB,
                    alpha: (0.45 + shimmer * 0.5) * (0.55 + 0.45 * proj.scale)
                });
            }

            // C. Twinkling Ornament Lights
            for (let i = 0; i < ornamentLights.length; i++) {
                const l = ornamentLights[i];
                const proj = project(l.t, l.r, l.theta);

                let twinkle = Math.sin(time * l.twinkleSpeed + l.phase) * 0.5 + 0.5;
                if (currentLightMode === 'rhythm') {
                    // Dramatic beat-synced flash
                    twinkle = Math.min(1, twinkle * 0.45 + beatPulse * 0.95);
                } else {
                    twinkle = Math.min(1, 0.35 + twinkle * 0.65 + beatPulse * 0.3);
                }

                // Dynamic color cycling for Neon mode
                let color = modeConfig.colors[l.colorIdx];
                if (currentLightMode === 'neon') {
                    const hue = (time * 0.06 + l.t * 280 + l.colorIdx * 45) % 360;
                    color = `hsl(${hue}, 95%, 68%)`;
                }

                renderQueue.push({
                    type: 'light',
                    x: proj.x, y: proj.y, z: proj.z,
                    size: (l.baseSize + twinkle * 1.8) * proj.scale,
                    color,
                    twinkle
                });
            }

            // Depth sort back-to-front (largest z is farthest)
            renderQueue.sort((a, b) => b.z - a.z);

            // Render Sorted 3D Tree
            for (let i = 0; i < renderQueue.length; i++) {
                const item = renderQueue[i];
                if (item.type === 'foliage') {
                    ctx.globalAlpha = item.alpha;
                    ctx.fillStyle = item.color;
                    ctx.beginPath();
                    ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
                    ctx.fill();
                } else if (item.type === 'ribbon') {
                    ctx.globalAlpha = item.alpha;
                    ctx.fillStyle = item.color;
                    ctx.beginPath();
                    ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
                    ctx.fill();
                } else if (item.type === 'light') {
                    // Bokeh glow halo
                    ctx.globalAlpha = item.twinkle * 0.35;
                    ctx.fillStyle = item.color;
                    ctx.beginPath();
                    ctx.arc(item.x, item.y, item.size * 2.8, 0, Math.PI * 2);
                    ctx.fill();

                    // Bright core
                    ctx.globalAlpha = Math.min(1, 0.55 + item.twinkle * 0.45);
                    ctx.fillStyle = item.color;
                    ctx.beginPath();
                    ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
                    ctx.fill();

                    // Specular hot center
                    ctx.globalAlpha = item.twinkle * 0.85;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(item.x, item.y, item.size * 0.42, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;

            // 5. Radiant Top Star
            drawTopStar(centerX, topY - 4, isMobile ? 14 : 18, time, beatPulse);

            // 6. Multi-Depth Snowfall
            if (snowLevel > 0) {
                const activeCount = snowLevel === 1 ? 95 : snowflakes.length;
                const speedMult = snowLevel === 1 ? 0.85 : 1.35;

                for (let i = 0; i < activeCount; i++) {
                    const sf = snowflakes[i];
                    sf.y += sf.speedY * speedMult;
                    sf.x += Math.sin(time * 0.001 + sf.phase) * 0.45 + sf.drift;

                    if (sf.y > height + 8) {
                        sf.y = -8;
                        sf.x = Math.random() * width;
                    }
                    if (sf.x > width + 8) sf.x = -8;
                    if (sf.x < -8) sf.x = width + 8;

                    ctx.fillStyle = `rgba(241, 245, 249, ${(0.25 + sf.depth * 0.65).toFixed(2)})`;
                    ctx.beginPath();
                    ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // 7. Interactive Click/Tap Fireworks & Stardust
            for (let i = fireworks.length - 1; i >= 0; i--) {
                const fw = fireworks[i];
                fw.x += fw.vx;
                fw.y += fw.vy;
                fw.vy += 0.045; // Gentle gravity
                fw.vx *= 0.985;
                fw.life -= fw.decay;

                if (fw.life <= 0) {
                    fireworks.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = fw.life;
                ctx.fillStyle = fw.color;
                ctx.beginPath();
                ctx.arc(fw.x, fw.y, fw.size * fw.life + 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Sparkle glow
                ctx.globalAlpha = fw.life * 0.35;
                ctx.beginPath();
                ctx.arc(fw.x, fw.y, fw.size * 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }


        /**
         * ============================================================================
         * 5. INTERACTIVE UI CONTROLS (Lighting, Snow, Mobile Drawer, Touch Spin)
         * ============================================================================
         */
        const LIGHT_MODE_KEYS = Object.keys(LIGHT_MODES);

        function applyLightMode(mode) {
            currentLightMode = mode;
            const modeName = LIGHT_MODES[mode].name;
            document.getElementById('light-mode-name').textContent = modeName;
            document.getElementById('mobile-mode-subtitle').textContent = `Đèn: ${modeName}`;

            document.querySelectorAll('.light-mode-btn').forEach(b => {
                const active = b.dataset.mode === mode;
                b.classList.toggle('border-amber-400/50', active);
                b.classList.toggle('bg-amber-400/15', active);
                b.classList.toggle('border-white/10', !active);
                b.classList.toggle('bg-white/5', !active);
                const label = b.querySelector('span:last-child');
                if (label) {
                    label.classList.toggle('text-slate-100', active);
                    label.classList.toggle('text-slate-300', !active);
                }
            });

            if (mode === 'rhythm' && !musicEngine.isPlaying) {
                showToast('Bật nhạc để đèn nhấp nháy theo giai điệu! 🎶');
            }
        }

        document.querySelectorAll('.light-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => applyLightMode(btn.dataset.mode));
        });

        // Quick light-mode cycle button on Mobile Mini-Bar
        document.getElementById('btn-mobile-light').addEventListener('click', () => {
            const idx = (LIGHT_MODE_KEYS.indexOf(currentLightMode) + 1) % LIGHT_MODE_KEYS.length;
            const nextMode = LIGHT_MODE_KEYS[idx];
            applyLightMode(nextMode);
            showToast(`Chế độ đèn: ${LIGHT_MODES[nextMode].name} ✨`);
        });

        // Snow density toggle (synced across top header & mobile drawer)
        function cycleSnowLevel() {
            snowLevel = (snowLevel + 1) % 3;
            const label = SNOW_LABELS[snowLevel];
            document.getElementById('snow-label').textContent = label;
            document.getElementById('mobile-snow-label').textContent = label;
            showToast(`Chế độ tuyết: ${label.replace('Tuyết: ', '')} ❄️`);
        }
        document.getElementById('btn-snow-toggle').addEventListener('click', cycleSnowLevel);
        document.getElementById('btn-mobile-snow').addEventListener('click', cycleSnowLevel);

        // Mobile Slide-Up Settings Bottom Sheet Drawer
        const mainUiOverlayEl = document.getElementById('main-ui-overlay');
        const controlDockEl = document.getElementById('control-dock');
        const drawerBackdropEl = document.getElementById('drawer-backdrop');
        let drawerCloseTimer = null;

        function openMobileDrawer() {
            clearTimeout(drawerCloseTimer);
            mainUiOverlayEl.classList.remove('z-20');
            mainUiOverlayEl.classList.add('z-40');
            controlDockEl.classList.add('drawer-open');
            drawerBackdropEl.classList.remove('hidden');
            requestAnimationFrame(() => drawerBackdropEl.classList.remove('opacity-0'));
        }

        function closeMobileDrawer() {
            controlDockEl.classList.remove('drawer-open');
            drawerBackdropEl.classList.add('opacity-0');
            clearTimeout(drawerCloseTimer);
            drawerCloseTimer = setTimeout(() => {
                drawerBackdropEl.classList.add('hidden');
                mainUiOverlayEl.classList.remove('z-40');
                mainUiOverlayEl.classList.add('z-20');
            }, 300);
        }

        document.getElementById('btn-open-drawer').addEventListener('click', openMobileDrawer);
        document.getElementById('btn-close-drawer').addEventListener('click', closeMobileDrawer);
        drawerBackdropEl.addEventListener('click', closeMobileDrawer);

        // Hide / Show Control Panels for Clean Viewing Mode (keeps Tree & Wish visible!)
        let isUICollapsed = false;
        document.getElementById('btn-toggle-ui').addEventListener('click', () => {
            closeMobileDrawer();
            isUICollapsed = !isUICollapsed;
            const uiLayers = document.querySelectorAll('.ui-layer');
            const eyeOpen = document.getElementById('icon-eye-open');
            const eyeClosed = document.getElementById('icon-eye-closed');
            const toggleText = document.getElementById('ui-toggle-text');

            uiLayers.forEach(el => {
                if (isUICollapsed) el.classList.add('ui-hidden');
                else el.classList.remove('ui-hidden');
            });

            if (isUICollapsed) {
                eyeOpen.classList.add('hidden');
                eyeClosed.classList.remove('hidden');
                toggleText.textContent = 'Hiện bảng';
                showToast('Chế độ ngắm toàn màn hình ✨');
            } else {
                eyeOpen.classList.remove('hidden');
                eyeClosed.classList.add('hidden');
                toggleText.textContent = 'Thu gọn';
            }
        });

        // Canvas Touch/Mouse Interaction: 1-Finger Drag Horizontally to Spin 3D Tree, Tap for Fireworks
        canvas.addEventListener('pointerdown', (e) => {
            if (isDraggingTree) return;
            isDraggingTree = true;
            activePointerId = e.pointerId;
            hasDraggedBeyondTap = false;
            pointerDownX = e.clientX;
            pointerDownY = e.clientY;
            lastDragX = e.clientX;
            try {
                canvas.setPointerCapture(e.pointerId);
            } catch (err) {
                // Ignore if browser does not allow pointer capture on this event
            }
        });

        canvas.addEventListener('pointermove', (e) => {
            if (!isDraggingTree || e.pointerId !== activePointerId) return;
            const totalMove = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
            if (!hasDraggedBeyondTap) {
                if (totalMove > 6) {
                    hasDraggedBeyondTap = true;
                    lastDragX = e.clientX;
                }
                return;
            }
            const dx = e.clientX - lastDragX;
            const sensitivity = e.pointerType === 'touch' ? 0.011 : 0.0085;
            const deltaAngle = dx * sensitivity;
            treeAngle += deltaAngle;
            treeAngularVelocity = deltaAngle * 0.85;
            lastDragX = e.clientX;
        });

        canvas.addEventListener('pointerup', (e) => {
            if (!isDraggingTree || e.pointerId !== activePointerId) return;
            if (!hasDraggedBeyondTap) {
                spawnFirework(e.clientX, e.clientY);
            }
            isDraggingTree = false;
            activePointerId = null;
            hasDraggedBeyondTap = false;
        });

        canvas.addEventListener('pointercancel', (e) => {
            if (e.pointerId !== activePointerId) return;
            isDraggingTree = false;
            activePointerId = null;
            hasDraggedBeyondTap = false;
        });

        let lastResponsiveBucket = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            resizeCanvas();
            const isNowMobile = window.innerWidth <= 768;
            if (isNowMobile !== lastResponsiveBucket) {
                lastResponsiveBucket = isNowMobile;
                initSceneEntities();
                if (!isNowMobile) closeMobileDrawer();
            }
        });

        // Initialize directly after React mounts the canvas and controls.
        resizeCanvas();
        initSceneEntities();
        renderWish(currentWishIndex, false);
        lastWishTick = performance.now();
        requestAnimationFrame(animate);

    
}

