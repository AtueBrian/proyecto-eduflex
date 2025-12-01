const nodemailer = require("nodemailer");
jest.mock("nodemailer");

const dbMock = {
  querySQL: jest.fn()
};

const canjesModule = require("../modulos/canjes/controlador")(dbMock);
const { realizarCanje, notificarCanje, listarPorCliente } = canjesModule;

describe("realizarCanje", () => {
  it("debe crear un canje y descontar puntos y stock", async () => {
    const body = { idCliente: 1, idProducto: 2, cantidad: 1 };

    // Mock DB: todas las queries que hace realizarCanje + la de notificarCanje
    dbMock.querySQL
      .mockResolvedValueOnce([
        { id: 1, nombre: "Juan", correo: "juan@mail.com", puntos: 100 }
      ]) // cliente
      .mockResolvedValueOnce([{ puntosRequeridos: 50, stock: 10 }]) // producto
      .mockResolvedValueOnce({ insertId: 123 }) // insert canje
      .mockResolvedValueOnce({}) // insert detalle_canje
      .mockResolvedValueOnce({}) // update cliente
      .mockResolvedValueOnce({}) // update stock
      .mockResolvedValueOnce([
        { id: 123, nombre: "Juan", correo: "juan@mail.com", fecha: new Date() }
      ]); // notificarCanje

    // Mock para no enviar mail real
    const sendMailMock = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const result = await realizarCanje(body);

    expect(result).toHaveProperty("idCanje", 123);
    expect(dbMock.querySQL).toHaveBeenCalledTimes(7);
    expect(sendMailMock).toHaveBeenCalled(); 
  });
});

describe("notificarCanje", () => {
  it("debe enviar un mail al cliente", async () => {
    const idCanje = 123;

    dbMock.querySQL.mockResolvedValueOnce([
      { id: 123, nombre: "Juan", correo: "juan@mail.com", fecha: new Date() }
    ]);

    const sendMailMock = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const result = await notificarCanje(idCanje);

    expect(sendMailMock).toHaveBeenCalled();
    expect(result).toHaveProperty("exito", true);
  });
});

describe("listarPorCliente", () => {
  it("debe devolver la lista de canjes de un cliente", async () => {
    const idCliente = 1;

    const mockData = [
      {
        idCanje: 1,
        fechaCanje: new Date(),
        idProducto: 2,
        nombre: "Producto A",
        imagen: "img.png",
        cantidad: 1,
        puntosUsados: 50
      }
    ];

    dbMock.querySQL.mockResolvedValueOnce(mockData);

    const result = await listarPorCliente(idCliente);

    expect(result).toEqual(mockData);
    expect(dbMock.querySQL).toHaveBeenCalledWith(expect.any(String), [idCliente]);
  });
});
