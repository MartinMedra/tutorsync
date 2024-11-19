-- DropForeignKey
ALTER TABLE "Citas" DROP CONSTRAINT "Citas_disponibilidadId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_citaId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_citasId_fkey";

-- AddForeignKey
ALTER TABLE "Citas" ADD CONSTRAINT "Citas_disponibilidadId_fkey" FOREIGN KEY ("disponibilidadId") REFERENCES "Disponibilidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_citasId_fkey" FOREIGN KEY ("citasId") REFERENCES "Citas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "Citas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
