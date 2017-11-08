export function createTableRow(instrument){
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.innerHTML =  instrument.Symbol;
    tr.appendChild(td);

    const tdAsk = document.createElement("td");
    tdAsk.setAttribute('class', 'ask-cell-'+ instrument.Uic);
    tr.appendChild(tdAsk);

    const tdBid = document.createElement("td");
    tdBid.setAttribute('class', 'bid-cell-'+ instrument.Uic);
    tr.appendChild(tdBid);

    return tr;
}