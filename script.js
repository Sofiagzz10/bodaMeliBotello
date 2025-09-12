                // Animación de entrada para las fotos (solo las grandes fotos de otras secciones)
                document.addEventListener('DOMContentLoaded', () => {
                    const largePhotos = document.querySelectorAll('.large-photo');
                    largePhotos.forEach((photo, index) => {
                        photo.style.opacity = '0';
                        photo.style.animationDelay = `${1.5 + index * 0.1}s`;
                        photo.style.animation = 'fadeIn 1.2s ease-out forwards';
                    });
                });
    
            // Efecto de scroll suave entre secciones (opcional)
            /* 
            document.querySelectorAll('.panel').forEach((panel, index) => {
                panel.addEventListener('click', () => {
                    if (index < document.querySelectorAll('.panel').length - 1) {
                        document.querySelectorAll('.panel')[index + 1].scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            */
    
            // Función para agregar evento al calendario
            function addToCalendar() {
                const event = {
                    title: 'Boda de Melissa y Joel',
                    start: '2025-10-25T19:30:00',
                    end: '2025-10-25T23:00:00',
                    location: 'Zanq by Cinco Catering',
                    description: 'Nos complace invitarte a compartir con nosotros el comienzo de nuestra vida juntos, con la bendición de Dios y nuestros padres.'
                };
    
                // Crear enlace para Google Calendar
                const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '')}/${event.end.replace(/[-:]/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
                
                // Abrir en nueva pestaña
                window.open(googleUrl, '_blank');
            }
    
            // Contador regresivo
            function updateCountdown() {
                const weddingDate = new Date('2025-10-25T17:00:00').getTime();
                const now = new Date().getTime();
                const distance = weddingDate - now;
    
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }
    
            // Actualizar contador cada segundo
            setInterval(updateCountdown, 1000);
            updateCountdown(); // Ejecutar inmediatamente
    
        // Animación de carga inicial (simplificada)
        window.addEventListener('load', () => {
            // Carga simple sin efectos adicionales
        });

        // Carrusel circular de imágenes
        const imageArray = [
            'img/2.jpg',
            'img/3.jpg', 
            'img/6.jpg'
        ];
        
        let currentIndex = 0;
        let isAnimating = false;

        function initCarousel() {
            const items = document.querySelectorAll('.carousel-item');
            items.forEach((item, index) => {
                item.classList.remove('left', 'center', 'right');
                if (index === 0) {
                    item.classList.add('left');
                } else if (index === 1) {
                    item.classList.add('center');
                } else if (index === 2) {
                    item.classList.add('right');
                }
            });
        }

        function rotateCarousel() {
            if (isAnimating) return;
            isAnimating = true;

            const items = document.querySelectorAll('.carousel-item');
            
            // Rotación circular: left -> center, center -> right, right -> left
            items.forEach(item => {
                if (item.classList.contains('left')) {
                    item.classList.remove('left');
                    item.classList.add('center');
                } else if (item.classList.contains('center')) {
                    item.classList.remove('center');
                    item.classList.add('right');
                } else if (item.classList.contains('right')) {
                    item.classList.remove('right');
                    item.classList.add('left');
                }
            });

            // Actualizar imágenes
            const leftItem = document.querySelector('.left');
            const centerItem = document.querySelector('.center');
            const rightItem = document.querySelector('.right');
            
            // Rotar el array de imágenes
            const temp = imageArray[0];
            imageArray[0] = imageArray[2];
            imageArray[2] = imageArray[1];
            imageArray[1] = temp;
            
            // Aplicar nuevas imágenes
            leftItem.style.backgroundImage = `url('${imageArray[0]}')`;
            centerItem.style.backgroundImage = `url('${imageArray[1]}')`;
            rightItem.style.backgroundImage = `url('${imageArray[2]}')`;

            isAnimating = false;
        }

        // Inicializar carrusel
        document.addEventListener('DOMContentLoaded', () => {
            initCarousel();
            
            // Iniciar rotación automática después de 3 segundos
            setTimeout(() => {
                setInterval(rotateCarousel, 3000);
            }, 3000);
        });

        // Animaciones de scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos con animaciones
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        });

        // Función para editar respuesta
        function editResponse() {
            // Resetear variables de confirmación
            if (typeof confirmacion !== 'undefined') {
                confirmacion = 'no ha confirmado';
            }
            if (typeof invitadosConfirmados !== 'undefined') {
                invitadosConfirmados = '';
            }
            
            // Mostrar formulario de nuevo
            document.getElementById('asis').style.display = 'block';
            document.querySelector('.yes-no-input').style.display = 'flex';
            document.getElementById('conf').style.display = 'block';
            document.querySelector('.number-input').style.display = 'flex';
            document.getElementById('boton2').style.display = 'block';
            document.getElementById('editResponse').style.display = 'none';
            
            // Resetear valores
            document.getElementById('choice').value = 'no';
            document.getElementById('quantity').value = '0';
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('active'));
        }
    
            //función del back
            function mostrarParrafoyaConf() {
                document.getElementById('h11').style.display = 'block';
                document.getElementById('yaconf').style.display = 'block';
                document.getElementById('yaconf2').style.display = 'block';
                
                // Ocultar los elementos de confirmación
                document.getElementById('tienes1').style.display = 'none';
                document.getElementById('tienes2').style.display = 'none';
                document.getElementById('asis').style.display = 'none';
                document.querySelector('.yes-no-input').style.display = 'none';
                document.getElementById('conf').style.display = 'none';
                document.querySelector('.number-input').style.display = 'none';
                document.getElementById('boton2').style.display = 'none';
            }
    
            function mostrarConfirmacion1(invitadosPermitidos) {
                document.getElementById('h11').style.display = 'block';
                document.getElementById('tienes1').style.display = 'block';
                document.getElementById('asis').style.display = 'block';
                document.querySelector('.yes-no-input').style.display = 'block';
                document.getElementById('conf').style.display = 'block';
                document.querySelector('.number-input').style.display = 'block';
                document.getElementById('boton2').style.display = 'block';
                
                // Ocultar los párrafos de confirmación
                document.getElementById('tienes2').style.display = 'none';
                document.getElementById('yaconf').style.display = 'none';
                document.getElementById('yaconf2').style.display = 'none';
                document.getElementById('allowedGuests').textContent = invitadosPermitidos;
    
            }
            function mostrarConfirmacion2(invitadosPermitidos) {
                document.getElementById('h11').style.display = 'block';
                document.getElementById('tienes2').style.display = 'block';
                document.getElementById('asis').style.display = 'block';
                document.querySelector('.yes-no-input').style.display = 'block';
                document.getElementById('conf').style.display = 'block';
                document.querySelector('.number-input').style.display = 'block';
                document.getElementById('boton2').style.display = 'block';
                
                // Ocultar los párrafos de confirmación
                document.getElementById('tienes1').style.display = 'none';
                document.getElementById('yaconf').style.display = 'none';
                document.getElementById('yaconf2').style.display = 'none';
                console.log("Estableciendo allowedGuests en mostrarConfirmacion2:", document.getElementById('quantity').max);
                document.getElementById('allowedGuests').textContent = invitadosPermitidos;
                const tienes2Element = document.getElementById('tienes2');
                tienes2Element.innerHTML = `ESTA INVITACIÓN ES PARA <span id="allowedGuests">${invitadosPermitidos}</span> PERSONAS`;
            }
    
    
            document.addEventListener('DOMContentLoaded', async () => {
                const decrementButton = document.getElementById('decrement');
                const incrementButton = document.getElementById('increment');
                const quantityInput = document.getElementById('quantity');
                const yesButton = document.getElementById("yes");
                const noButton = document.getElementById("no");
                const choiceInput = document.getElementById("choice");
    
                const id = window.location.pathname.split('/').pop();
                console.log("ID obtenido:", id);
    
                if (id) {
                    try {
                    const response = await fetch(`/api/invitado/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                const invitado = await response.json();
            
                document.getElementById('guestName').textContent = invitado.nombre;
                document.getElementById('allowedGuests').textContent = invitado.invitadosPermitidos;
            
                if (invitado.confirmacion === "no ha confirmado") {
                    quantityInput.max = invitado.invitadosPermitidos;
                    quantityInput.value = invitado.invitadosPermitidos;
                    choiceInput.value = 'yes';
                    yesButton.classList.add('active');
                    noButton.classList.remove('active');
    
                    if(invitado.invitadosPermitidos == 1){
                    mostrarConfirmacion1(invitado.invitadosPermitidos);
                    }else {
                    mostrarConfirmacion2(invitado.invitadosPermitidos);
                    }
                    
                } else {
                    mostrarParrafoyaConf();
                }
            
                } catch (error) {
                console.error('Error detallado al obtener datos del invitado:', error);
                document.getElementById('errorMessage').textContent = `Error al cargar los datos del invitado: ${error.message}`;
                }
            } else {
                console.error('No se encontró ID en la URL');
                document.getElementById('errorMessage').textContent = 'No se pudo identificar al invitado. Por favor, verifica la URL.';
            }
    
            decrementButton.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue > 0) {
                quantityInput.value = currentValue - 1;
                }
            });
    
            incrementButton.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                const maxValue = parseInt(quantityInput.max);
                if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
                }
            });
    
            yesButton.addEventListener("click", () => {
                yesButton.classList.add("active");
                noButton.classList.remove("active");
                choiceInput.value = "yes";
            });
    
            noButton.addEventListener("click", () => {
                noButton.classList.add("active");
                yesButton.classList.remove("active");
                choiceInput.value = "no";
            });
            });
    
            async function submitResponse() {
            const id = window.location.pathname.split('/').pop();
            const choiceInput = document.getElementById("choice");
            const quantityInput = document.getElementById('quantity');
            const confirmacion = choiceInput.value === 'yes';
            const invitadosConfirmados = parseInt(quantityInput.value);
            const invitadosPermitidos = parseInt(document.getElementById('allowedGuests').textContent);
            
            // Verificación de invitados confirmados
                if (confirmacion && invitadosConfirmados > invitadosPermitidos) {
                alert('Estás seleccionando más invitados de los permitidos. Por favor, ajusta la cantidad.');
                return; // Detiene la ejecución de la función aquí
                }
    
            try {
                console.log('invitados Permitidos:', {invitadosPermitidos});
                console.log('Enviando datos:', { id, confirmacion, invitadosConfirmados });
                
                const response = await fetch(`/api/invitado/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmacion, invitadosConfirmados }),
                });
    
                console.log('Respuesta del servidor:', response.status, response.statusText);
    
                if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
    
                const result = await response.json();
                console.log('Respuesta actualizada:', result);
                alert('Tu respuesta ha sido enviada. ¡Gracias!');
                mostrarParrafoyaConf();
                
                // Mostrar botón de editar respuesta
                document.getElementById('editResponse').style.display = 'block';
            } catch (error) {
                console.error('Error detallado al actualizar la respuesta:', error);
                alert(`Hubo un error al enviar tu respuesta: ${error.message}. Por favor, intenta de nuevo.`);
            }
        }
    document.getElementById('copyButton').addEventListener('click', function() {
        // Selecciona el texto dentro del span con id 'accountNumber'
        const accountNumber = document.getElementById('accountNumber').innerText;
        
        // Usa la API del portapapeles para copiar el texto
        navigator.clipboard.writeText(accountNumber).then(() => {
            // Si la copia es exitosa, cambia el texto del botón temporalmente
            const button = document.getElementById('copyButton');
            button.innerText = '¡COPIADO!';
            
            // Vuelve al texto original después de 2 segundos
            setTimeout(() => {
                button.innerText = 'COPIAR NÚMERO DE CUENTA';
            }, 2000);
            
        }).catch(err => {
            // Si hay un error, lo muestra en la consola
            console.error('Error al copiar al portapapeles: ', err);
        });
    });
