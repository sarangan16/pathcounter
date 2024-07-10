document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const dropZone = document.getElementById('dropZone');

    fileInput.addEventListener('change', handleFileSelect);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleFileDrop);

    function handleFileSelect(event) {
        const files = event.target.files;
        processFiles(files);
    }

    function handleDragOver(event) {
        event.preventDefault();
        dropZone.classList.add('dragover');
    }

    function handleFileDrop(event) {
        event.preventDefault();
        dropZone.classList.remove('dragover');
        const files = event.dataTransfer.files;
        processFiles(files);
    }

    async function processFiles(files) {
        fileList.innerHTML = '';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let fullPath = '';

            if (file.webkitRelativePath) {
                fullPath = file.webkitRelativePath; // This gives relative path from the directory selected by the user
            } else {
                // For security reasons, most browsers do not expose full paths directly
                fullPath = file.name; // Fallback to just the file name
            }

            const li = document.createElement('li');
            const pathLength = fullPath.length;

            li.textContent = `${fullPath} (${pathLength} characters)`;

            if (pathLength > 200) {
                li.classList.add('long-path');
            } else {
                li.classList.add('short-path');
            }

            fileList.appendChild(li);
        }
    }
});
