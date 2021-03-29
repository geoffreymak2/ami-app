import numeral from 'numeral';
import moment from 'moment';

import getTransactionsSolde from '../../transactions/getTransactionsSolde';
import filterTransactions from '../../transactions/filterTransactions';
import getAdminAttribut from '../../admins/getAdminAttribut';
const getFormatedDate = (date) => moment(date).format('DD/MM/YYYY');

const getFormatedNumber = (number) =>
  !!number ? `${numeral(number).format('0,0[.]00')} Fc` : '';

const getSpecificAdminName = (admins, code) =>
  !!admins.find((admin) => admin.code === code)
    ? admins.find((admin) => admin.code === code).nom
    : '';

const getSpecificAdmin = (admins, code) =>
  admins.find((admin) => admin.code === code);

const createRow = ({member, transaction, miseSolde}, dates, admins, idx) => {
  const filtredTransactions = filterTransactions(transaction, dates);
  return 1
    ? `
        <tr>
          <td class="tg-l470">${member?.id}</td>
          <td class="tg-l470">
            <span
              style="font-weight:400;font-style:normal; font-size:8pt; text-transform: uppercase;"
            >
              ${member?.nom}
            </span>
          </td>
          <td class="tg-lvqx">
            ${getFormatedNumber(getTransactionsSolde(transaction, 'D'))}
          </td>
          <td class="tg-lvqx">
            ${getFormatedNumber(getTransactionsSolde(transaction, 'R'))}
          </td>
          <td class="tg-lvqx">
            ${getFormatedNumber(getTransactionsSolde(transaction))}
          </td>
          <td class="tg-lvqx">
            ${getFormatedNumber(miseSolde[0])}
          </td>
        </tr>
      `
    : '';
};
/* const createRow = ({member, transaction}, dates, admins, idx) => {
  const filtredTransactions = filterTransactions(transaction, dates);
  return !!filtredTransactions && !!filtredTransactions.length
    ? html`
        <tr>
          <td class="tg-l470">${!!member ? member.id : ''}</td>
          <td class="tg-l470 uppercase">${!!member ? member.nom : ''}</td>
          <td class="tg-l470">${!!member ? member.telephone : ''}</td>
          <td class="tg-l470 uppercase">${!!member ? member.adresse : ''}</td>

          <td class="tg-l470 uppercase">
            ${!!admins && !!member
              ? getSpecificAdminName(admins, member.code_admin)
              : ''}
          </td>
          <td class="tg-lvqx">
            ${!!member ? getFormatedNumber(member.mise) : ''}
          </td>
          <td class="tg-lvqx">
            ${!!transaction
              ? getFormatedNumber(getTransactionsSolde(filtredTransactions))
              : ''}
          </td>

          <td class="tg-lvqx">
            ${!!transaction
              ? getFormatedNumber(getTransactionsSolde(transaction))
              : ''}
          </td>
        </tr>
      `
    : '';
}; */

const createTable = ({admin, data}, dates, admins) => {
  /*  const reportTransactions = getTransactionLessThan(
    transaction,
    dates.dateFrom,
  ); */
  const {member} = data;

  return `
    <tr class="no-border top">
      <th class="tg-49qb">Code:</th>
      <th class="tg-j1i3">
        <span style="font-weight:400;font-style:normal">
          ${!!admin ? admin?.id : ''}
        </span>
      </th>
      <th class="tg-49qb"></th>
      <th class="tg-49qb"></th>
      <th class="tg-49qb">Attribut:</th>
      <th class="tg-j1i3">
        <span style="font-weight:400;font-style:normal">
          ${!!admin ? getAdminAttribut(admin?.attribut) : ''}
        </span>
      </th>
    </tr>

    <tr class="no-border bottom">
      <th class="tg-49qb">Nom:</th>
      <th class="tg-j1i3">
        <span style="font-weight:400;font-style:normal">
          ${!!admin ? admin?.nom : ''}
        </span>
      </th>
      <th class="tg-49qb"></th>
      <th class="tg-49qb"></th>
      <th class="tg-49qb">Téléphone:</th>
      <th class="tg-j1i3">
        <span style="font-weight:400;font-style:normal">
          ${!!admin ? admin?.telephone : ''}
        </span>
      </th>
    </tr>

    <tr class="label">
      <th class="tg-9gfu center">Code</th>
      <th class="tg-9gfu center">Libellé</th>
      <th class="tg-9gfu center">Dépot</th>
      <th class="tg-9gfu center">Rétrait</th>
      <th class="tg-9gfu center">Solde</th>
      <th class="tg-9gfu center">Mise</th>
    </tr>

    ${
      !!data
        ? data.map((data, idx) => createRow(data, dates, admins, idx)).join('')
        : ''
    }
  `;
};
/* const createTable = (data, dates, admins) => {
  const {member, transaction} = data;
  return `
  <tr>
    <th class="tg-9gfu">Code</th>
    <th class="tg-9gfu">Nom</th>
    <th class="tg-9gfu">Téléphone</th>
    <th class="tg-9gfu">Adresse</th>
   
    <th class="tg-9gfu">Collecteur</th>
    <th class="tg-9gfu">Mise</th>
    <th class="tg-9gfu">Solde Periodique</th>
    <th class="tg-9gfu">Solde Total</th>
  </tr>
  ${
    !!data
      ? data.map((data, idx) => createRow(data, dates, admins, idx)).join('')
      : ''
  }
`;
}; */

/**
 * @description Generate an `html` page with a populated table
 * @param {[Object]} data
 * @returns {String}
 */
const createHtml = (data, dates, admins) => `
  <html>
    <head>
      <style>
        body {
          font: 11pt Arial, 'Times New Roman', Times, serif;
          line-height: 1.3;
          position: relative;
          padding-top: 120px;
        }

        @page {
          /* set page margins */
          margin: 0.6cm;

          counter-increment: page;

          top {
            content: 'Page ' counter(page) ' of ' counter(pages) ' pages ';
          }
        }

        #header {
          position: absolute;
          display: table-header-group;
          width: 100%;
          top: 0;
          left: 0;
          margin-bottom: 100px;
        }

        .title {
          width: 100%;
          text-align: center;
          position: relative;
          padding-top: 30px;
        }
        .title h3 {
          text-decoration: none;
          font-size: 14pt;
        }

        .title .date {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 10pt;
          font-weight: normal;
        }

        .tg {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          page-break-before: always;
        }
        .tg td {
          border-color: black;
          border-style: solid;
          border-width: 1px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          overflow: hidden;
          padding: 10px 20px;
          word-break: normal;
        }
        .tg th {
          border-color: black;
          border-style: solid;
          border-width: 1px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: normal;
          overflow: hidden;
          padding: 10px 20px;
          word-break: normal;
        }

        .tg .tg-j1i3 {
          border-color: inherit;
          position: -webkit-sticky;
          position: sticky;
          text-align: left;
          top: -1px;
          vertical-align: top;
          will-change: transform;
        }
        .tg .tg-lvqx {
          border-color: inherit;
          font-size: 13px;
          text-align: right;
          vertical-align: top;
        }
        .tg .tg-l470 {
          border-color: inherit;
          font-size: 13px;
          text-align: left;
          vertical-align: top;
        }
        .tg .tg-49qb {
          border-color: inherit;
          font-family: Georgia, serif !important;
          font-size: 16px;
          font-weight: bold;
          position: -webkit-sticky;
          position: sticky;
          text-align: left;
          top: -1px;
          vertical-align: top;
          will-change: transform;
        }
        .tg .tg-zufh {
          border-color: inherit;
          font-family: Georgia, serif !important;
          font-size: 16px;
          font-weight: bold;
          text-align: left;
          vertical-align: top;
        }
        .tg .tg-pcvp {
          border-color: inherit;
          text-align: left;
          vertical-align: top;
        }
        .tg .tg-9gfu {
          border-color: #333333;
          font-size: 15px;
          font-weight: bold;
          text-align: center;
          vertical-align: top;
        }

        tg tfoot td {
          border-color: black;
          border-style: solid;
          border-width: 1px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: normal;
          overflow: hidden;
        }

        tr {
          text-align: left;
          border: 1px solid black;
          margin-top: 50px;
        }
        th,
        td {
          padding: 5px;
        }

        .no-content {
          background-color: red;
        }
        td,
        th {
          border: 1px solid black;
        }

        table {
          border-collapse: collapse;
        }

        tr.no-border.top {
          border-bottom: none;
        }

        tr.no-border.bottom {
          border-top: none;
        }

        tr.no-border th {
          border: none;
        }

        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }

        td {
          font-size: 12px;
        }

        .label th {
          padding: 5px;
        }
        .label th.center {
          padding-top: 20px;
        }

        .label th.report {
          text-align: left;
        }
      </style>
    </head>
    <body>
      <div id="header">
        <div class="title">
          <p class="date">Kinshasa, le ${getFormatedDate(new Date())}</p>
          <h3>
            LISTE DE MEMBRES ACTIFS <br />DU ${getFormatedDate(dates.dateFrom)}
            AU ${getFormatedDate(dates.dateTo)}
          </h3>
        </div>
      </div>
      <table class="tg">
        ${data && data.map((data) => createTable(data, dates, admins)).join('')}
      </table>
    </body>
  </html>
`;

/* generate html table */
const generateTable = (data, admins, dates) => {
  try {
    const html = createHtml(data, dates, admins);
    return html;
  } catch (error) {
    console.log('Error generating table', error);
  }
};

export default generateTable;
