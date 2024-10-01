-- AddForeignKey
ALTER TABLE "Citas" ADD CONSTRAINT "Citas_disponibilidadId_fkey" FOREIGN KEY ("disponibilidadId") REFERENCES "Disponibilidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
