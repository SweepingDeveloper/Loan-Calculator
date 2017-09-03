		'use strict';

		var regstring = '';  //Global Variable
		var alphalist = 'abcdfghijkmopquvwxyzABCDFGHIJKMOPQUVWXYZ';
		var eoclist = 'rstlneRSTLNE';  
		var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','Decemeber'];
		
		var filenameuse = '';
		var calcflag = 0;
		
		
		/*
		var STAGE_WIDTH = 600, 
			STAGE_HEIGHT=  50,
			FRAMERATE   =  33,
			GAME_FONTS  = "14px sans-serif";
			
		var POS_X = 8,
			POS_Y = 32;
			
			
		var r_stage = document.getElementById('regularCanvas');
		var s_stage = document.getElementById('snowballCanvas');
		r_stage.width = 600;
		r_stage.height = 50;
		s_stage.width = 600;
		s_stage.height = 50;
		var r_ctx = r_stage.getContext("2d");
		var s_ctx = s_stage.getContext("2d");
		r_ctx.fillStyle = "#FFFFFF";
		s_ctx.fillStyle = "#FFFFFF";
		r_ctx.font = GAME_FONTS;
		s_ctx.font = GAME_FONTS;
		*/		

		
		
		function startProgram()
		{
			document.getElementById('calc').onclick = calc;		//Whenever you click the id 'calc' button, call the calc function.
			document.getElementById('clear').onclick = clear;
			//document.getElementById('load').onclick = load;
			document.getElementById('download').onclick = download;
			
			
			//var ac_checked = document.getElementById('autocalc')
			
			
			var tab = document.getElementById('fields');
			var list = tab.getElementsByTagName('INPUT');
			
			for (var i=0 ; i<list.length ; i++)
			{
					list[i].addEventListener('change',autoCalc);
			}
			
			
					
			
			var fileInput = document.getElementById('fileInput');
					//var fileDisplayArea = document.getElementById('fileDisplayArea');

					fileInput.addEventListener('change', function(e) 
					{
						var file = fileInput.files[0];
						var textType = /text.*/;
						var counter = 0;
						var flag = 0;
						regstring = '';
						
						if (file.type.match(textType)) {
							var reader = new FileReader();

							reader.onload = function(e) {
								console.log(reader.result);
								document.getElementById('filename').value = file.name;
								document.getElementById('filename').value = document.getElementById('filename').value.substring(0,document.getElementById('filename').value.length - 4)
								//Decryption Code Begins Here
								
								for (var a = 0 ; a < reader.result.length; a++)
								{
									for (var b = 0; b < eoclist.length; b++)
									{
										if (reader.result.substring(a,a+1) == eoclist.substring(b,b+1))
										{
											regstring += String.fromCharCode(counter);
											flag = 1;
											break;
										}
										
									}
									if (flag == 0){counter++;} else {counter = 0; flag = 0;}
								}
								
								
								
								//Decryption Code Ends Here
								
								//document.box.loadstuff.value = regstring;
								load();
								//fileDisplayArea.innerText = reader.result;
							}

							reader.readAsText(file);    
						} else {
							document.box.loadstuff.value = "File not supported!"
						}
					});
		}


		function clear()
		{		
			var tab = document.getElementById('fields');
			var list = tab.getElementsByTagName('INPUT');
			for (var i=0 ; i<list.length ; i++)
			{
				if (list[i].type=='text')
				{
					list[i].value = '';
				}
			}
			calcflag = 0;
		}

		function load()
		{
			var stuff = ['','','','','','','','','','',
						'','','','','','','','','','',
						'','','','','','','','','','',
						'','','','','','','','','',''];
			var counter = 0;
			var testchar;
			var bigtext;
			var table = document.getElementsByTagName('TABLE')[0];
			//var list = document.getElementById('loadstuff');
			var tab = document.getElementById('fields');
			
			var list_2 = tab.getElementsByTagName('INPUT');
			
			document.getElementById('fields').focus();
			
		   

			
			
			
			
			
			//console.log(list.value);
			//console.log(list.value.substring(0,1));
			
			for (var a = 0;a <= 39;a++)
			{
				bigtext =  '';
				do
				{
					
					
					testchar = regstring.substring(counter,counter + 1);
					console.log(a + ": testchar is " + testchar + ", counter is "+ counter);
					if (testchar == '*')
					{
						counter++;
						stuff[a] = bigtext;
						break;
					}
					else
					{					
						bigtext += testchar;
					}
					counter++;
					if (counter > 999)
					{
						console.log("Error at field " + a);
						break;
					}
					
					//if (counter > 99) {break;}
				}
				while (a != 100);

				
				console.log(a+ "  "+ stuff[a]);

				if (list_2[a].type == 'text')
				{
						list_2[a].value = stuff[a];
						
				}

			}
			calc();
			
		}	
			//for (var i=0; i<list_2.length;i++)
		
		function autoCalc()
		{
			console.log("Change detected.")
			if (document.getElementById('autocalc').checked)
			{
				calc();
			}	
		}
	
		//From http://stackoverflow.com/questions/20876715/extending-array-function-getting-this-err-uncaught-typeerror-object-object-ar
		Array.prototype.max = function () {
			return Math.max.apply(null, this);
		};

		Array.prototype.min = function() {
			return Math.min.apply(null, this);
		};
	
		function calc()
			{
				/*
				s_ctx.fillStyle="#000000";
				s_ctx.fillRect(0,0,s_stage.width,s_stage.height);
				r_ctx.fillStyle="#000000";
				r_ctx.fillRect(0,0,s_stage.width,s_stage.height);
				s_ctx.fillStyle="#FFFF00";
				r_ctx.fillStyle="#FFFF00";
				*/
			var loan = ['','','','','','','','','','']; 		//Loan names (for console)
			var balance = [0,0,0,0,0,0,0,0,0,0];				//Original balance.
			var interest = [0,0,0,0,0,0,0,0,0,0];				//Original interest rate.
			var payment = [0,0,0,0,0,0,0,0,0,0];				//Original monthly payment.
			var total;
			
			var s_loan;											//Loan # that gets the snowball money.
			var s_amount;										//Amount of snowball money.
			var s_refbalance;									//Lowest balance of loan in determining who gets the snowball money.
		
			var s_balance = [0,0,0,0,0,0,0,0,0,0];				//Balance used in snowball calculation.
			//var s_balance = [999999,999999,999999,999999,999999,999999,999999,999999,999999,999999];				//Balance used in snowball calculation.
			var s_interest = [0,0,0,0,0,0,0,0,0,0];				//Interest rate used in snowball calculation.
			var s_payment = [0,0,0,0,0,0,0,0,0,0];				//Monthly payment used in snowball calculation.
			var s_months = 0;									//# of months in the snowball calculation.
			var s_oldmonths = 0;
			var s_months_temp = [1200,1200,1200,1200,1200,1200,1200,1200,1200,1200];			//Months left in current calculation.			
			var s_months_step = 0;								//Months for each 'step'.
			var s_total;										//Total current balance in snowball calculation.
			
			
			var r_balance = [0,0,0,0,0,0,0,0,0,0];				//Balance used in regular calculation.
			var r_interest = [0,0,0,0,0,0,0,0,0,0];				//Interest rate used in regular calculation.
			var r_payment = [0,0,0,0,0,0,0,0,0,0];				//Monthly payment used in regular calculation.
			var r_months = 0;									//# of months in the regular calculation.
			var r_oldmonths = 0;
			var r_total;										//Total current balance in regular calculation.
			var r_months_temp = [0,0,0,0,0,0,0,0,0,0];			//Months left in current calculation.	
			var r_impossible = 0;								//Impossibility Flag.
			var table = document.getElementsByTagName('TABLE')[0]; 
			var list = table.getElementsByTagName('INPUT');	
			//var ta = document.box.loadstuff.value;
		
			var d = new Date();	
			var m = d.getMonth();
			var y = d.getFullYear();
		
			var a = 0;
			
			
		
			for (var a = 0; a <= 9; a++)	
			{
				
				loan[a] = list[(a*4)].value;
				balance[a] = Number(list[(a*4)+1].value);
				console.log(balance[a]);
				interest[a] = Number(list[(a*4)+2].value) / 100;
				console.log(interest[a]);
				payment[a] = Number(list[(a*4)+3].value);
				console.log(payment[a]);
			
				s_balance[a] = balance[a]; 	 r_balance[a] = balance[a];
				s_interest[a] = interest[a]; r_interest[a] = interest[a];
				s_payment[a] = payment[a];   r_payment[a] = payment[a];
				
				console.log("s_balance["+a+"] is..."+ s_balance[a]);
			}
		//First, calculate how long it will take each loan to be paid off individually.
			/*
				if (r_balance[a] > 0)
				{
					r_months_temp[a] = SolveForTime(r_balance[a], r_interest[a], r_payment[a]);
					console.log("r_months_temp["+a+"] = "+r_months_temp[a]);
				}
				else
				{
					r_months_temp[a] = 0;
				}
				
				//If, in the regular method, the loan can't be paid off, then the regular method becomes
				//impossible.
				if (r_months_temp[a] < 0) {r_impossible = 1;}			
			
			
			
			if (r_impossible == 1)	
			{
				r_months = 1200;
			}
			else
			{
				//Check for the loan that takes the longest to pay off in the regular method.
				//That is your answer for the regular calculation, rounded up one.
				r_months = Math.ceil(Math.max.apply(null, r_months_temp));
				
			}
			
			
			
			console.log ("r_months = "+r_months);
			//SNOWBALL CALCULATION
			s_months = 0;										//Reset snowball month amount.
			do
			{
				
				for (var a = 0; a <=9; a++)
				{
					//Eliminate all zero balances from the min equation.
					if (s_balance[a] <= 0) {s_balance[a] = 999999;}
				}
				for (var a = 0; a <= 9; a++)
				{				
					

					//If the current loan amount being checked is the lowest, mark it.
					
					console.log("s_balance.min is..."+ Math.min.apply(null, s_balance));
					if (s_balance[a] == Math.min.apply(null, s_balance)) 
					{
						s_loan = a; 
						console.log ("Test....." + s_loan);
					}
					
					
				}
				
				for (var a = 0; a <=9; a++)
				{
					//Restore the zero balances.
					if (s_balance[a] == 999999) {s_balance[a] = 0;}
				}
			
				s_amount = 0;									//Reset current snowball amount.
				s_refbalance = 999999;							//Reset reference balance. (I hope you don't owe millions...)
					
				//Build the snowball.
				for (var a = 0; a <= 9; a++)
				{
					s_payment[a] = payment[a];					//Reset the regular payment for a loan.
					console.log('S Balance '+ a+ "= "+s_balance[a]+"\n");
					console.log('S Payment '+ a+ "= "+s_payment[a]+"\n");
					if (s_balance[a] <= 0)						//If there's no balance...
					{
						s_amount += s_payment[a];				//...Transfer what you would have paid to the snowball payment,
						s_payment[a] = 0;						//and clear the payment.
					}
				}
				
				//Add the snowball money to the 'winning' loan at this time.
				console.log("Payment before snowball is applied: $"+s_payment[s_loan]);
				s_payment[s_loan] += s_amount;									
				console.log("Payment after snowball is applied: $"+s_payment[s_loan]);
			
				
			
				//Calculate how long it will take to pay off all loans individually.
				//Take the loan that will take the least amount of time to pay off and
				//mark its months.
				for (var a = 0; a <= 9; a++)
				{

					
					s_months_temp[a] = SolveForTime(s_balance[a], s_interest[a], s_payment[a]);
					
					//If there's no balance, leave it alone by pretending to make the loan 
					//impossible to pay off.
					if (s_balance[a] <= 0)
					{
						s_months_temp[a] = 1200;
					}
					
					console.log("Solving for time #"+a+": "+s_months_temp[a])
					if (Math.min.apply(null, s_months_temp) == s_months_temp[a])
					{
						s_months_step = Math.ceil(s_months_temp[a]);
						console.log("s_months_step = "+s_months_step);
					}
				}
			
				//Adjust balances accordingly.
				for (var a = 0; a <= 9; a++)
				{
					if (s_balance[a] > 0)
					{
						s_balance[a] = SolveForAmount(s_balance[a], s_interest[a], s_payment[a], s_months_step);
					}
					else
					{
						s_balance[a] = 0;
					}
					console.log("Solving for amount #"+a+": "+s_balance[a])
				}
				s_months += s_months_step;
				
				//Reset s_months_temp values.
				for (var a = 0; a <= 9; a++)	{s_months_temp[a] = 1200;}
				
				//Check total balance.
				s_total = 0;							
				for (var a = 0; a <= 9; a++)
				{
					s_total += s_balance[a];
					console.log(s_total + '\n');
				}
				console.log('Total balance after ' + s_months+ ' month(s) : $' + s_total.toFixed(2)+ '\n');

			
			}
			while (s_total > 0 && s_months < 1200)
			document.getElementById('snowball').innerHTML = s_months;
			
			if (s_months < 12)
			{
				document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: "
			+ s_months + " months.";
			}
			else if (s_months >= 12 && s_months < 1200)
			{
				if (s_months >= 12 && s_months < 24)
				{
					document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: One year and " + (s_months % 12) + " months.";
				}
				else 
				{
					document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: "	+ Math.floor((s_months / 12)) + " years and " + (s_months % 12) + " months.";
				}
				

			}
			else
			{
				document.getElementById('snowball1').innerHTML = "It is impossible to get out of debt with these current payments.";
			}
			
			*/
			
			
			//Snowball payment calculation
			
			console.log ('SNOWBALL PAYMENT CALCULATION \n');

			do
			{
				console.log('Months elapsed:' + s_months + '\n');
				s_amount = 0;									//Reset current snowball amount.
				s_refbalance = 999999;							//Reset reference balance. (I hope you don't owe millions...)
				
				//Build the snowball.
				for (var a = 0; a <= 9; a++)
				{
					s_payment[a] = payment[a];					//Reset the regular payment for a loan.
					console.log('S Balance '+ a+ "= "+s_balance[a]+"\n");
					if (s_balance[a] <= 0)						//If there's no balance...
					{
						s_amount += s_payment[a];				//...Transfer what you would have paid to the snowball payment,
						s_payment[a] = 0;						//and clear the payment.
					}
				}
				console.log('Snowball amount: $'+s_amount.toFixed(2)+ '\n');
				
				//Find the lowest balance.
				if (s_amount > 0)													//If there's money in the snowball...
				{

					for (var a = 0; a <= 9; a++)
					{
						if (s_balance[a] <= s_refbalance && s_balance[a] > 0)		//If Loan a is lower than the reference balance...
						{
							s_refbalance = s_balance[a];							//...it becomes the new reference balance...
							s_loan = a;												//and the loan # is marked.
						}
					}
				}
				console.log('Lowest balance: $'+s_refbalance.toFixed(2) + '\n');
				console.log(loan[s_loan] + ' gets the snowball money. \n');
				
				
				s_payment[s_loan] += s_amount;									//Add the snowball money to the 'winning' loan at this time.
				
				//Make a payment and charge interest.
				for (var a = 0; a <= 9; a++)
				{
					//if (s_balance[a] > 0)
					//{
						s_balance[a] -= s_payment[a];									//Make a payment.
						console.log('New balance: $'+s_balance[a]+' \n');
						s_balance[a] *= 1 + (s_interest[a] / 12);						//Charge interest.
						console.log('New balance: $'+s_balance[a]+' \n');
						if (s_balance[a] <= 0)	
						{
							s_balance[a] = 0;											//Zero any credit balances.		
						}										
					//}
				}
				
				s_months++;															//Add a month to the counter.
				//months_temp[a] = 

				//Recheck the total balance.
				s_total = 0;							
				for (var a = 0; a <= 9; a++)
				{
					s_total += s_balance[a];
					console.log(s_total + '\n');
				}
				console.log('Total balance after ' + s_months+ ' month(s) : $' + s_total.toFixed(2)+ '\n');
				
			}
			while (s_total > 0 && s_months < 1200)
			//, in " + monthNames[(m+s_months) % 12] + " " + (y+parseInt((m+s_months)/12))+ "	
			document.getElementById('snowball').innerHTML = s_months;
			//s_ctx.fillText("Under the snowball method, your debt will be paid off in " + s_months + " months.",POS_X,POS_Y);
			if (s_months < 12)
			{
				document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: "
			+ s_months + " months.";
			}
			else if (s_months >= 12 && s_months < 1200)
			{
				if (s_months >= 12 && s_months < 24)
				{
					document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: One year and " + (s_months % 12) + " months.";
				}
				else 
				{
					document.getElementById('snowball1').innerHTML = "Snowball Payoff Time: "	+ Math.floor((s_months / 12)) + " years and " + (s_months % 12) + " months.";
				}
				

			}
			else
			{
				document.getElementById('snowball1').innerHTML = "It is impossible to get out of debt with these current payments.";
			}
			
			//Regular payment calculation.
			console.log('REGULAR PAYMENT CALCULATION \n');
			
			for (var a = 0; a <= 9; a++)
			{
				console.log (a + ' : ' + r_balance[a] + '\n');				
			}
			do
			{
				for (var a = 0; a <= 9; a++)
				{
					//if (r_balance[a] > 0)
					//{
						r_balance[a] -= r_payment[a];
						console.log('New balance: $'+r_balance[a]+' \n');
						r_balance[a] *= 1 + (r_interest[a] / 12);
						console.log('New balance: $'+r_balance[a]+' \n');
						if (r_balance[a] <= 0)	
						{
							r_balance[a] = 0;											//Zero any credit balances.		
						}										
					//}
				}
				
				r_months++;

				//Recheck the total balance.
				r_total = 0;							
				for (var a = 0; a <= 9; a++)
				{r_total += r_balance[a];}
				console.log('Total balance after ' + r_months+ ' month(s) : $' + r_total.toFixed(2)+ '\n');	
				
				
			}
			while (r_total > 0 && r_months < 1200)
				
			//*/
			
			//r_ctx.fillText("Under the regular method, your debt will be paid off in " + r_months + " months.",POS_X,POS_Y);

				document.getElementById('regular').innerHTML = r_months;
			if (r_months < 12)
			{
				document.getElementById('regular1').innerHTML = "Normal Payoff Time: "
				+ r_months + " months.";
			}
			else if (r_months >= 12 && r_months < 1200)
			{
				if (r_months >= 12 && r_months < 24)
				{
					document.getElementById('regular1').innerHTML = "Normal Payoff Time: One year and " + (r_months % 12) + " months.";										
				}
				else 
				{
					document.getElementById('regular1').innerHTML = "Normal Payoff Time: "
					+ Math.floor((r_months / 12)) + " years and " + (r_months % 12) + " months.";					
				}
			}
			else
			{
				document.getElementById('regular1').innerHTML = "You cannot pay off your debt with these given payments under the normal method.";
			}

			total = 0;
			for (var a = 0; a <= 9; a++)
			{
				total += balance[a];
				document.getElementById('out').style.fontSize="32px";
				document.getElementById('out').style.textAlign="right";
				document.getElementById('out').style.color="#FFFF00";
				document.getElementById('out').innerHTML = "Outstanding Balance: $<i>" + total.toFixed(2) + "</i>";
			}
			regstring = '';
			
			//regstring += '0';
			//document.box.loadstuff.value = '';
			
			for (var a = 0; a<= 39; a++)
			{
				regstring += list[a].value + "*";
				//document.box.loadstuff.value += list[a].value + "*";
			}
			calcflag = 1;
		}
		
		function download()
		{
			var table = document.getElementsByTagName('TABLE')[0]; 
			var list = table.getElementsByTagName('INPUT');	
			var cryptostring = '';
			//regstring = document.box.loadstuff.value;
			var c = 0;
			for (var a = 0; a < regstring.length; a++)
			{
				for (var b = 0; b < regstring.charCodeAt(a); b++)
				{
					c = parseInt(Math.random()*alphalist.length);
					cryptostring += alphalist.substring(c,c+1);
				}
				c = parseInt(Math.random()*eoclist.length);
				cryptostring += eoclist.substring(c,c+1);
				
			}
			
			console.log(cryptostring);
			
			var element = document.createElement('a');
			  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cryptostring));
			  element.setAttribute('download', list[44].value + ".txt");

			  element.style.display = 'none';
			  document.body.appendChild(element);

			  element.click();

			  document.body.removeChild(element);
			
			  
			  
			
		}
		
		function SolveForTime(bal, intr, pmt)
		{
			//Thanks to financeformulas.net
			var MONTHLY_RATE = intr/1200;
			if (MONTHLY_RATE > 0)
			{
				return (Math.log(Math.pow((1-((bal*MONTHLY_RATE)/pmt)),-1)) / Math.log(1+MONTHLY_RATE));
			}
			else	//Whoops.  Chuck Norris isn't here to divide by zero.
			{
				return bal/pmt;
			}
		}
		
		function SolveForAmount(bal, intr, pmt, pmts)
		{
			var MONTHLY_RATE = intr/1200
			if (MONTHLY_RATE > 0)
			{
				return bal * (Math.pow((1+MONTHLY_RATE),pmts)) - (pmt * (((Math.pow((1+MONTHLY_RATE),pmts))-1)/MONTHLY_RATE));	
			}
			else
			{
				return bal - (pmt*pmts);
			}
			
		}
		