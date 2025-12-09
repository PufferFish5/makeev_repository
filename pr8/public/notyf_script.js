const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true
});

document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 
            //const form = event.target;
            const titleInput = document.getElementById('titleInput'); 
            const title = titleInput.value;
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: title })
                });

                const result = response.status !== 204 ? await response.json() : {};

                if (response.ok) {
                    const message = result.title ? `Task "${result.title}" added` : (result.message);   
                    notyf.success(message);
                    titleInput.value = '';
                } else { 
                    const errorMessage = result.error;
                    notyf.error(errorMessage);
                }

            } catch (error) {
                console.error('Network error:', error);
                notyf.error('Connection problem?');
            }
        });
    }
});