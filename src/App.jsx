import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      toast.success("Tâche ajoutée avec succès !");
      setNewTodo("");
    } else {
      toast.error("Veuillez saisir une tâche !");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toast.info("État de la tâche mis à jour !");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.warning("Tâche supprimée !");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Ma Liste de Tâches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTodo} className="mb-6 flex gap-2">
            <Input
              type="text"
              placeholder="Ajouter une nouvelle tâche..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Ajouter</Button>
          </form>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Aucune tâche pour le moment
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`${
                        todo.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {todos.filter((t) => t.completed).length} tâche(s) terminée(s) sur{" "}
              {todos.length}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
