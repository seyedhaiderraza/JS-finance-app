  const inputLoginUser = document.querySelector('.login-user')
  const inputLoginPIN = document.querySelector('.login-pin')
  const loginUserMsg = document.querySelector('.logo-text')
  const inputBalanceDate = document.querySelector('.balance-info-date span')
  const inputBalanceShow = document.querySelector('.balance-amount-show')
  const inputBalAmtCurrency = document.querySelector('.balance-amount-currency')
  const inputTxnType = document.querySelector('.transaction-type')
  const inputTxnAmt = document.querySelector('.transaction-amount')
  const inputTransferTo = document.querySelector('.transfer-to')
  const inputTransferAmt = document.querySelector('.transfer-amount')
  const transferBtn = document.querySelector('.transfer-btn')
  const inputActionBtn = document.querySelector('.actions-btn')
  const inputWithdrawAmt = document.querySelector('.withdrawal-amount')
  const inputLoanAmt = document.querySelector('.loan-amount')
  const containerTxn = document.querySelector(`.transaction-list-container`)
  const TotalDepositsShow = document.querySelector(`.TotalDeposits p`)
  const TotalWithdrawalsShow = document.querySelector(`.TotalWithdrawals p`)
  const TotalInterestsShow = document.querySelector(`.TotalInterests p`)
  const loginBtn = document.querySelector('.login-btn')
  const closeAccountButton = document.querySelector('.account-close-btn')
  const closeUserName = document.querySelector('.close-username')
  const closePin = document.querySelector('.close-pin')
  const sortBtn = document.querySelector('.sort-pane').querySelector('button')
  const inputDepositAmt = document.querySelector('.deposit-amount')
  const depositBtn = document.querySelector('.deposit-btn')

  const accounts = [{
          owner: 'John Smith',
          transactions: [500, -250, 1000, -300],
          interestRate: 1.2,
          pin: 1234,
          username: 'jsmith'
      },
      {
          owner: 'Jane Doe',
          transactions: [2000, -500, 1500, -700],
          interestRate: 1.5,
          pin: 5678,
          username: 'jdoe'
      },
      {
          owner: 'Bob Johnson',
          transactions: [1000, -300, 800, -200],
          interestRate: 1.0,
          pin: 9876,
          username: 'bjohnson'
      },
      {
          owner: 'Alice Lee',
          transactions: [1500, -400, 1200, -600],
          interestRate: 1.3,
          pin: 2468,
          username: 'alee'
      },
      {
          owner: 'Tom Brown',
          transactions: [800, -200, 600, -100],
          interestRate: 0.8,
          pin: 1357,
          username: 'tbrown'
      },
      {
          owner: 'Sara Kim',
          transactions: [3000, -1000, 2000, -1500],
          interestRate: 2.0,
          pin: 3690,
          username: 'skim'
      }
  ];
  const EUtoUSD = 1.2

  //const usdTxns = transactions.map((txn) => {
  //   return txn * EUtoUSD
  //   })
  //   const userNames = fullNames.map((fName) => {
  //           const name = fName.toLowerCase().split(' ')

  //           const username = name.map((nm) => {
  //               return nm[0]
  //           }).join('')
  //           return username
  //       })
  //const deposits = transactions.filter(txn => txn > 0)
  // const withdrawals = transactions.filter(txn => txn < 0)
  //   const highestAmountDeposited = transactions.reduce((acc, txn) => {
  //       if (txn > 0 && txn > acc) {
  //           return txn
  //       }
  //       return acc
  //   }, transactions[0])
  //   const highestAmountWithdrawn = transactions.reduce((acc, txn) => {
  //       if (txn < 0 && txn < acc) {
  //           return txn
  //       }
  //       return acc
  //   }, transactions[0])
  inputBalanceDate.textContent = new Date()


  const displayTransactions = function(account) {
      containerTxn.innerHTML = ''

      account.transactions.forEach((txnAmt, index) => {
          const type = txnAmt > 0 ? 'deposit' : 'withdrawal'
              // const tabColor = 
          const html = ` 
      <div class="transaction-container">
              <div class="transaction-type ${type === 'withdrawal' ? 'redColor' : ''}"><span>${index+1} </span>${type}</div>
              <div class="transaction-amount">${Math.abs(txnAmt)}$</div>
      </div>
      <hr>`



          containerTxn.insertAdjacentHTML('afterbegin', html)
      })
      inputBalanceShow.textContent = displayTotalBalance(account)


  }
  const displayTotalBalance = (account) => {
      return account.transactions.reduce((acc, txn) => {
          return acc + txn * EUtoUSD
      }, 0)
  }
  const totalDepositsDisplay = (account) => {
      const amtDepositedUSD = account.transactions.filter((txn) => {
          return txn > 0
      }).map((depoTxn) => {
          return depoTxn * EUtoUSD
      })


      TotalDepositsShow.textContent = amtDepositedUSD.reduce((acc, depo) => {
          return acc + depo
      }, 0) + `$`

      console.log(`deposit Txns in USD: ${amtDepositedUSD}`);
  }
  const displayWithdrawals = (account) => {
      const amtWithdrawnUSD = account.transactions.filter((txn) => {
          return txn < 0
      }).map((withdrawnTxn) => {
          return withdrawnTxn * EUtoUSD
      })



      TotalWithdrawalsShow.textContent = amtWithdrawnUSD.reduce((acc, withd) => {
          return acc + withd
      }, 0) + `$`
      console.log(`Withdrawn Txns in USD: ${amtWithdrawnUSD}`);
  }
  const displayInterest = (account) => {
      const totalInterest = account.transactions.filter((txn) => {
              return txn > 0
          })
          .map((deposits) => {
              return deposits * 0.233
          })
          .reduce((acc, depositIntst) => {
              return acc + depositIntst
          }, 0)

      TotalInterestsShow.textContent = totalInterest.toFixed(2)
      console.log(`total interest: ${totalInterest.toFixed(2)}`);

  }

  const account = accounts.find((acc) => {
      return acc.owner === 'John Smith'
  })
  const displaySummary = (account) => {
      totalDepositsDisplay(account)
      displayInterest(account)
      displayWithdrawals(account)
  }
  const updateUI = (account) => {
          displayTransactions(account)
          inputBalanceShow.textContent = displayTotalBalance(account)
          displaySummary(account)
      }
      ///////////Event handling with Login///////////
      ////////////LOGIN///////////////////
  let currentAccount = []
  loginBtn.addEventListener('click', (event) => {
      event.preventDefault() //prevent form submission
      console.log('LOGIN')
      const account = accounts.find(acc => acc.username == inputLoginUser.value)
      console.log(account);
      currentAccount = account

      if (account.pin === Number(inputLoginPIN.value)) {
          document.querySelector('.main-container').style.opacity = 1
          loginUserMsg.style.opacity = 1
          inputLoginUser.value = ''
          inputLoginPIN.value = ''
              //display ui 
          loginUserMsg.innerHTML = `Welcome back Mr. ${account.owner.split(' ')[0]}` //insertAdjacentHTML('beforebegin', `Welcome back Mr. ${account.owner}`)
              // name and balance

          inputBalanceShow.innerHTML = displayTotalBalance(account)
              //display trxns
          displayTransactions(account)
              //display summary
          displaySummary(account)
          console.log(`pin correct`);
      }

  })

  //////////Transfer/////////////
  transferBtn.addEventListener('click', (event) => {
          const receiverOwner = inputTransferTo.value
          const receiverAmt = inputTransferAmt.value
          console.log(displayTotalBalance(currentAccount));
          let rcvrAccount = ''
          if (displayTotalBalance(currentAccount) > 0 && receiverOwner !== currentAccount.owner && receiverAmt > 0) {
              rcvrAccount = accounts.find((acc) => acc.owner === receiverOwner)
              rcvrAccount.transactions.push(Number(receiverAmt))
              currentAccount.transactions.push(-receiverAmt)
              inputTransferAmt.textContent = ''
              inputTransferTo.textContent = ''
              updateUI(currentAccount)
          }
      })
      //////////////////////Close Account///////////////
  closeAccountButton.addEventListener('click', (event) => {
          console.log(accounts);
          const accountDeleteIndex = currentAccount.username == closeUserName.value && currentAccount.pin == closePin.value ? accounts.findIndex((acc) => acc.username == closeUserName.value) : -1
          console.log(accountDeleteIndex);
          accountDeleteIndex != -1 ? accounts.splice(accountDeleteIndex, 1) : false
          console.log(accounts);

      })
      ///////////////////////Sort Transactions/////////
  sortBtn.addEventListener('click', (e) => {
          ///const transactions = currentAccount.transactions.reverse()
          const sortTxnAcc = accounts.find(acc => acc.owner === currentAccount.owner)
          const transactions = sortTxnAcc.transactions.reverse()
          sortTxnAcc.transactions = transactions
          displayTransactions(sortTxnAcc, true)
      })
      //////////////////////Deposit money//////////////
  depositBtn.addEventListener('click', (e) => {
      const TxAmt = Number(inputDepositAmt.value)
      const depositFlag = (TxAmt > (0.1 * currentAccount.transactions.slice().sort((a, b) => a - b)[currentAccount.transactions.length - 1])) ? currentAccount.transactions.push(TxAmt) : false

      displayTransactions(currentAccount)
  })