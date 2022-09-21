
import { useState, useEffect } from 'react';
import { Task } from './components/task';
import { Reorder} from 'framer-motion' 
import { Theme } from './components/theme';
import { AddTask } from './components/addTask';
import { ITransfer } from './interfaces/transferInterface';
import { IPage } from './interfaces/pageInterface';
import { ListsRoster } from './components/listsRoster';
import { ListModal } from './components/listModal';
import { ThemeProvider } from './components/themeContext';

function App() {
  
  //Задачи, выводимые на экран в данный момент
  const [tasks,setTasks] = useState<Array<ITransfer>>([])

  //Задачи, полученные из БД
  const [downloadTasks,setDownloadTasks] = useState<Array<ITransfer>>([])

  //Подгрузка актуальных значений задач из БД
  useEffect(()=>{
    const requestTasks = async() => {
      await fetch('http://localhost:3001/').then(res=>res.text()).then(res=>{
      setDownloadTasks(JSON.parse(res))
    })
    }
    requestTasks()
  },[tasks])

  //Загрузка данных из БД
  useEffect(()=>{
    const requestTasks = async() => {
      await fetch('http://localhost:3001/').then(res=>res.text()).then(res=>{setTasks(JSON.parse(res))
    })
    }
    requestTasks()
    const requestLists = async() => {
      await fetch('http://localhost:3001/list').then(res=>res.text()).then(res=>{setPages(JSON.parse(res))
    })
    }
    requestLists()
  },[])

  //Значение задачи, привязаное к инпуту
  const [task,setTask]=useState('') 
  
  /* //Какая сейчас тема
  const [theme,setTheme] = useState(true)

  //Метод смены темы
  const changeTheme = () => {
    setTheme(!theme)
  } */

  //Метод добавление новой задачи
  const addHandler = () => {
    if(task.trim()==='' ){
      return
    }
    setTasks([...tasks,{key:Date.now(), data:task,date:new Date().getTime(),updated:-1}])
    setTask('') 
    const request = async() => {
      await fetch('http://localhost:3001/',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({key:Date.now(), data:task,date:new Date().getTime(),updated:-1})
         
      })
    }
    request()
    
  }

  //Метод удаление задачи
  const onRemove = (key:Number) => {
    setTasks(tasks.filter((e)=>{return key!==e.key}))
    const request = async() => {
      await fetch('http://localhost:3001/task/'+ key,{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    request()
  }

  //Метод переименования задачи
  const onRename = (renameValue:string,key:number)=>{
    const updated = Date.now()
    setTasks(tasks.map(i=>{
      if(i.key===key){
        return {
          ...i,
          data:renameValue,
          updated: updated
        }
      }
      return i
    }))
    
    const request = async() => {
      await fetch(('http://localhost:3001?data=' + renameValue + '&key=' + key + '&updated='+ updated.toString()) ,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    request()
  }

  //Ключ списка, выводимого на экран в данный момент
  const [key,setKey]=useState<Array<string>>([''])

  const changeKey = (key:Array<string>) => {
    setKey(key)
  }



  //Метод изменения положения задач
  const onDragEnd = () =>{
    if(allowChange===false){
      const request = async() => {
        await fetch('http://localhost:3001/list/drag',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({key:key,tasks:tasks})
           
        })
      }
      request()
    } else {
    const request = async() => {
      await fetch('http://localhost:3001/drag',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tasks)
         
      })
    }
    request()
    }
  }

  //Метод по добавлению новой задачи
  const enterTask = (value:string) => {
    setTask(value)
  }


  //Включает окно добавления списка
  const [addPage,setAddPage] = useState(false)

  //Добавляемый список
  const [page,setPage] = useState<Array<ITransfer>>([])

  //Все списки
  const [pages,setPages] = useState<Array<IPage>>([])

  //Имя списка
  const [nameofPage,setNameofPage]= useState('')

  //Херня
  useEffect(()=>{
    console.log(pages);
  },[pages])

  //Метод добавления задачи в список
  const addTask = (e:ITransfer) => {
    setPage([...page,e])
  }

  //Метод удаления задачи из списка
  const deleteTask = (e:ITransfer) => {
    setPage(page.filter((d)=>d!==e))
  }

  //Метод добавления списка
  const addList = () => {
    if(nameofPage.trim()===''){
      setPage([])
      return
    } 
    setPages(prev=>[...prev,{key:Date.now(), name:nameofPage,pages:page}])
    setPage([])
    setNameofPage('')
    setAddPage(false)
    const request = async() => {
      await fetch('http://localhost:3001/list',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({key:Date.now(), name:nameofPage,pages:page})
      })
    }
    request()
  } 

  //Метод удаления списка
  const deleteList = (page:IPage) => {
    setPages(pages.filter((e)=>e.name!==page.name))
    const request = async() => {
      await fetch('http://localhost:3001/list/'+ page.key,{
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    request()

    
  }
  
  //Метод для показа окна добавления списка
  const showModalWindow = (e:boolean) => {
    setAddPage(e)
  }

  //Метод изменения задач на экране на задачи какого-то списка
  const showList = (list:Array<ITransfer>) => {
    setTasks(list)
  }

  //Метод добаления имени списку
  const addNameofPage = (e:string) => {
    setNameofPage(e)
  }

  //Разрешить внесение изменений в задачи
  const [allowChange,setAllowChange]= useState(true)

  const changeAllow = (e:boolean) => {
    setAllowChange(e)
  }


  return (
    <ThemeProvider>
    <div className='w-1/2 m-auto ' >
      <ListsRoster deleteList={deleteList} downloadTasks={downloadTasks} pages={pages} changeKey={changeKey}
      showList={showList} showModalWindow={showModalWindow} changeAllow={changeAllow}></ListsRoster>
      <ListModal addList={addList} addNameofPage={addNameofPage} addPage={addPage} addTask={addTask} 
        deleteTask={deleteTask} downloadTasks={downloadTasks} nameofPage={nameofPage} showModalWindow={showModalWindow}></ListModal>
      <AddTask enterTask={enterTask} value={task} addHandler={addHandler} allowChange={allowChange} />
      <Reorder.Group axis="y" onReorder={setTasks} values={tasks}>
        {tasks.map(item=>
              <Task  key={item.key} data={item} deleteItem={onRemove} renameItem={onRename} onDragEnd={onDragEnd} allowChange={allowChange}   />
          )}
      </Reorder.Group>
      <Theme />
    </div>
    </ThemeProvider>
  );
}

export default App;

