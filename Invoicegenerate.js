const fs = require('fs');
const PDFDocument=require('pdfkit')
module.exports=function createInvoice(invoice, path) {
	let doc = new PDFDocument({ margin: 50 });

	generateHeader(doc,invoice);
	generateHeader1(doc,invoice);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc);
    //console.log(doc)
    console.log(path)
	doc.end();
	doc.pipe(fs.createWriteStream(path));
}
var data1=0
function generateHeader(doc,invoice) {
	const shipping = invoice.shipping;
	doc.image('logo.png', 50, 45, { width: 100 })
		.fillColor('#444444')
		.fontSize(25)
		.text('Invoice', 480, 45)
		.fontSize(16)
		.text('No', 500, 80)
		.fontSize(12)
		.text("1234", 495, 100)
		.moveDown();
}

function generateHeader1(doc) {
	doc.fontSize(16)
		.text('From', 60, 140)
		.fontSize(12)
		.text("ak@gamil",60,165)
		.text("ak@gamil.com",60,180)
		.text("888888888",60,195)
		.fontSize(16)
		.text('Bill to', 60, 230)
		.fontSize(12)
		.text("ak",60,250)
		.text("ak1@gamil",60,265)
		.text("ak1@gamil.com",60,280)
		.text("9999999999",60,295)
		.fontSize(16)
		.text('No', 500, 80)
		.text('status',500,140)
		.fontSize(16)
		.fillColor("red")
		.text("UnPaid",500,160)
		.fillColor("black")
		.fontSize(16)
		.fillColor("grey")
		.text('Date', 500, 180)
		.fontSize(12)
		.fillColor("black")
		.text("10/12/2021",500,200)
		.fontSize(12)
		.fillColor("grey")
		.text('Due Date', 500, 220)
		.fontSize(12)
		.fillColor("black")
		.text("10/12/2021",500,250)
		.fontSize(16)
		.fillColor("grey")
		.text('Amount', 500, 270)
		.fontSize(20)
		.fillColor("red")
		.text("2000$",500,290)
		.fillColor("black")
}

function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;

	
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	data1=y
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 150, y)
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(c4, 370, y, { width: 90, align: 'right' })
		.text(c5, 0, y, { align: 'right' });
}
function generateInvoiceTable(doc, invoice) {
	let i,
		invoiceTableTop = 380;
        generateTableRow(
			doc,
			invoiceTableTop,
			"#",
			"name",
			"price per peice",
			"quantity",
			"amount",
		);
	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			i+1,
			item.name,
			item.price,
			item.quantity,
			item.price*item.quantity,
		);
	}
}
function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment is due within 15 days. Thank you for your business.',
		50,
		data1+80,
		{ align: 'center', width: 500 },
	);
}