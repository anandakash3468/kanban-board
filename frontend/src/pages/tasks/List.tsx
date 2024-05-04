import React, { useEffect } from "react";
import {
  KanbanBoard,
  KanbanBoardContainer,
} from "../../components/kanban/board";
import taskStagesData from "../../constants/taskStages.json";
import {
  ProjectCardMemo,
  ProjectCardSkeleton,
} from "../../components/kanban/card";
import AddCardButton from "../../components/kanban/addCardButton";
import {
  KanbanColumn,
  KanbanColumnSkeleton,
} from "../../components/kanban/KanbanColumn";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, selectTasksLoading } from "../../redux/tasksSlice";
import { AppDispatch } from "../../store/store";
import { fetchTasks, updateTask } from "../../redux/actions/taskActions";
import { KanbanItem } from "../../components/kanban/item";
import { useNavigate } from "react-router-dom";

const List = ({ children }: React.PropsWithChildren<any>) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const stages = taskStagesData;
  const isLoading = useSelector(selectTasksLoading);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const taskStages: any = React.useMemo(() => {
    if (!tasks?.data || !stages?.data)
      return {
        unassignedStage: [],
        stages: [],
      };

    const unassignedStage = tasks?.data.filter(
      (task: any) => task.stageId === null
    );

    const grouped: any = stages.data.taskStages.nodes.map((stage: any) => ({
      ...stage,
      tasks: tasks.data.filter(
        (task: any) => task.stageId?._id?.toString() === stage?._id
      ),
    }));

    return {
      unassignedStage,
      columns: grouped,
    };
  }, [tasks, stages]);

  const handleAddCard = (args: { stageId: string }) => {
    console.log("ooooooooooooookkk", args.stageId);
    const path=args.stageId=== "unassigned" ? "/tasks/new" :`tasks/new?stageId=${args.stageId}`;

    navigate(path)
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleOnDragEnd = async (event: any) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId?._id;
    if (taskStageId?._id === stageId) {
      return;
    }
    if (stageId === "unassigned") {
      stageId = null;
    }

    dispatch(updateTask({ id: taskId, stageId: stageId }));
  };

  return (
    <>
      
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id={"unassigned"}
            title={"unassigned"}
            count={taskStages?.unassignedStage?.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unassigned" })}
          >
            {taskStages.unassignedStage?.map((task: any) => (
              <KanbanItem
                key={task._id}
                id={task._id}
                data={{ ...task, stageId: "unassigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate ? task.dueDate : undefined}
                  id={task._id}
                />
              </KanbanItem>
            ))}

            {!taskStages.unassignedStage.length && (
              <AddCardButton
                onClick={() => handleAddCard({ stageId: "unassigned" })}
              />
            )}
          </KanbanColumn>

          {taskStages.columns?.map((column: any) => {
            return (
              <KanbanColumn
                key={column._id}
                id={column._id}
                title={column.title}
                count={column.tasks.length}
                onAddClick={() => handleAddCard({ stageId: column._id })}
              >
                {isLoading && <ProjectCardSkeleton />}
                {!isLoading &&
                  column.tasks.map((task: any) => {
                    return (
                      <KanbanItem key={task._id} id={task._id} data={task}>
                        <ProjectCardMemo
                          {...task}
                          id={task._id}
                          dueDate={task.dueDate || undefined}
                        />
                      </KanbanItem>
                    );
                  })}
                {!column.tasks.length && (
                  <AddCardButton
                    onClick={() =>
                      handleAddCard({
                        stageId: column.id,
                      })
                    }
                  />
                )}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default List;

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;
  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, columnIndex) => (
        <KanbanColumnSkeleton key={columnIndex}>
          {Array.from({ length: itemCount }).map((_, itemIndex) => (
            <ProjectCardSkeleton key={itemIndex} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
