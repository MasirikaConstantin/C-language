document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded');
        const modules = document.getElementById('modules');
        const exercices = document.getElementById('exercices');
        const projets = document.getElementById('projets');
        modules.innerHTML = `
            <li>Module 1</li>
            <li>Module 2</li>
            <li>Module 3</li>
            <li>Module 4</li>
            <li>Module 5</li>
        `;
        modules.style.color = 'red';
        modules.style.fontSize = '20px';
        modules.style.fontWeight = 'bold';
        modules.style.textAlign = 'center';
        modules.style.textDecoration = 'underline';
        modules.style.textTransform = 'uppercase';
        modules.style.textShadow = '2px 2px 2px black';
        modules.style.textOverflow = 'ellipsis';
        modules.style.textOverflow = 'ellipsis';
});