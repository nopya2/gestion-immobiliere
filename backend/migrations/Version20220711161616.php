<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220711161616 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment DROP FOREIGN KEY FK_5FB71052783E3463');
        $this->addSql('DROP INDEX UNIQ_5FB71052783E3463 ON etablishment');
        $this->addSql('ALTER TABLE etablishment DROP manager_id');
        $this->addSql('ALTER TABLE manager ADD employee_id INT DEFAULT NULL, CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE manager ADD CONSTRAINT FK_FA2425B98C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FA2425B98C03F15C ON manager (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablishment ADD manager_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etablishment ADD CONSTRAINT FK_5FB71052783E3463 FOREIGN KEY (manager_id) REFERENCES manager (id) ON DELETE SET NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5FB71052783E3463 ON etablishment (manager_id)');
        $this->addSql('ALTER TABLE manager DROP FOREIGN KEY FK_FA2425B98C03F15C');
        $this->addSql('DROP INDEX UNIQ_FA2425B98C03F15C ON manager');
        $this->addSql('ALTER TABLE manager DROP employee_id, CHANGE id id INT NOT NULL');
    }
}
