const order = {};

function addToOrder(product, price, quantityId) {
    const quantity = prompt(`Enter quantity for ${product}:`);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid numeric quantity.');
        return;
    }
    if (order[product]) {
        order[product].quantity += Number(quantity);
    } else {
        order[product] = { price: price, quantity: Number(quantity) };
    }
    document.getElementById(quantityId).textContent = `Quantity: ${order[product].quantity}`;
}

function checkout() {
    const customerName = prompt('Enter your name to place the order:');
    if (!customerName) {
        alert('Name is required to checkout.');
        return;
    }

    let receipt = `<h2>Receipt for ${customerName}</h2><ul>`;
    let total = 0;
    for (const [product, details] of Object.entries(order)) {
        if (details.quantity > 0) {
            const cost = details.price * details.quantity;
            receipt += `<li>${product}: ${details.quantity} x $${details.price.toFixed(2)} = $${cost.toFixed(2)}</li>`;
            total += cost;
        }
    }
    const tax = total * 0.13;
    const totalWithTax = total + tax;
    receipt += `</ul><p>Subtotal: $${total.toFixed(2)}</p>`;
    receipt += `<p>Tax (13%): $${tax.toFixed(2)}</p>`;
    receipt += `<p>Total: $${totalWithTax.toFixed(2)}</p>`;
    document.getElementById('receipt').innerHTML = receipt;
}
