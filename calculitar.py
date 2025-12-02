from tkinter import*
list1=[]
a=""
def back_space():
    if len(list1) !=0:

        del list1[-1]

        stroka.configure(text = list1)
def clear_list1():
    global list1
    global a
    list1.clear()
    stroka.configure(text=a)
def rafno():
    global a
    if len(list1)!=0:
        for i in list1:
            a+=str(i)
        a=eval(a)
        stroka.configure(text=a)
        a=""
window=Tk()
window.title("калькулятор")
window.geometry("500x300")
stroka=Label(window,text="0")
stroka.grid(column=4,row=0)
w1=Button(window,text="1")
w1.grid(column=0,row=2)
w2=Button(window,text="2")
w2.grid(column=1,row=2)
w3=Button(window,text="3")
w3.grid(column=2,row=2)
w4=Button(window,text="4")
w4.grid(column=0,row=1)
w5=Button(window,text="5")
w5.grid(column=1,row=1)
w6=Button(window,text="6")
w6.grid(column=2,row=1)
w7=Button(window,text="7")
w7.grid(column=0,row=0)
w8=Button(window,text="8")
w8.grid(column=1,row=0)
w9=Button(window,text="9")
w9.grid(column=2,row=0)
w0=Button(window,text="0")
w0.grid(column=1,row=3)
umn=Button(window,text="X")
umn.grid(column=3,row=0)
delit=Button(window,text="/")
delit.grid(column=3,row=1)
minus=Button(window,text="-")
minus.grid(column=3,row=2)
rafno=Button(window,text="=",command=rafno, bg='orange')
rafno.grid(column=3,row=3)
plus=Button(window,text="+")
plus.grid(column=3,row=4)
cle=Button(window,text="CE", command=cle)
cle.grid(column=3,row=5)









