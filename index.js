
const colorsContainer = document.getElementById('scheme-container')

const schemeForm = document.getElementById('scheme-form')
const seedColor = document.getElementById('seed-color')
const schemeMode = document.getElementById('scheme-mode')

formData = {
    seed: 'f55a5a',
    schemeMode: 'monochrome'
}

schemeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    formData.seed = seedColor.value.substring(1)
    formData.schemeMode = schemeMode.value

    getColorScheme(formData)
})


async function getColorScheme(formData) {
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${formData.seed}&format=JSON&mode=${formData.schemeMode}&count=4`)
    const data = await response.json()

    renderColors(data)
}


function renderColors(data) {
    colorsContainer.innerHTML = getColorHtml(data)
}


function getColorHtml(data) {

    console.log(data)
    const { colors, seed } = data
    let colorsHtml = `
    <div class='color-container'>
        <div class='color'>
            <img src='${seed.image.bare}' />
        </div>
        <p>${seed.hex.value}</p>
    </div>
    
    `

    for(let color of colors) {
        colorsHtml += `
        <div class='color-container'>
            <div class='color'>
                <img src='${color.image.bare}' />
            </div>
            <p>${color.hex.value}</p>
        </div>
        
        `
    }

    return colorsHtml
}


getColorScheme(formData)