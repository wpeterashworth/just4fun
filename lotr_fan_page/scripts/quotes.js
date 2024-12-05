const quotesURL = "https://wpeterashworth.github.io/wdd230/final/data/quotes.JSON"
const quotes = document.querySelector("#movie-quotes")

async function apiFetchQuotes() {
    try {
        const response = await fetch(quotesURL)
        if (response.ok) {
            const quoteData = await response.json()
            displayQuotes(quoteData)
        }
        else {
            throw Error(await response.text())
        }
    }
    catch (error) {
        console.log(error)
    }
}


function displayQuotes(quoteData) {
    let quote1 = document.createElement("p")
    let quote2 = document.createElement("p")
    let quote3 = document.createElement("p")
    let quote4 = document.createElement("p")
    let quote5 = document.createElement("p")
    let quote6 = document.createElement("p")
    let quote7 = document.createElement("p")
    let quote8 = document.createElement("p")
    let quote9 = document.createElement("p")
    let quote10 = document.createElement("p")
    let quote11 = document.createElement("p")
    let quote12 = document.createElement("p")


    quote1.textContent = `"${quoteData.docs[19].dialog}" - Gollum`
    quote2.textContent = `"${quoteData.docs[86].dialog}" - Bilbo`
    quote3.textContent = `"Even the smallest person can change the course of the future." - Galadriel`
    quote4.textContent = `"${quoteData.docs[97].dialog}" - Frodo`
    quote5.textContent = `"${quoteData.docs[601].dialog}" - Gandalf`
    quote6.textContent = `"${quoteData.docs[410].dialog}" - Faramir`
    quote7.textContent = `"${quoteData.docs[863].dialog}" - Arwen`
    quote8.textContent = `"${quoteData.docs[135].dialog}" - Éowyn`
    quote9.textContent = `"${quoteData.docs[256].dialog}" - Legolas`
    quote10.textContent = `"${quoteData.docs[296].dialog}" - Aragorn`
    quote11.textContent = `"${quoteData.docs[650].dialog}" "${quoteData.docs[651].dialog}" - Frodo and Sam`
    quote12.textContent = `"I never thought I'd die fighting side by side with an elf." "How about side by side with a friend?" "Aye. I could do that." - Gimli and Legolas`

    quotes.appendChild(quote1)
    quotes.appendChild(quote2)
    quotes.appendChild(quote3)
    quotes.appendChild(quote4)
    quotes.appendChild(quote5)
    quotes.appendChild(quote6)
    quotes.appendChild(quote7)
    quotes.appendChild(quote8)
    quotes.appendChild(quote9)
    quotes.appendChild(quote10)
    quotes.appendChild(quote11)
    quotes.appendChild(quote12)
}

apiFetchQuotes()